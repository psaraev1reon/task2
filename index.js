const express = require("express");
const api = require("./api");
const logger = require("./logger");
const config = require("./config");
const getPrice = require("./helpers/getPrice");

const TASK_TYPE_ID = 2911698;
const PRICE_CHECK_TASK_TEXT = "Проверить бюджет";
const DAY_SECONDS = 60 * 60 * 24;
const CHECKED_NOTE_TEXT = "Бюджет проверен, ошибок нет";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/leads", async (req, res) => {
	const [reqLead] = req.body.leads.update || req.body.leads.add;
	const lead = await api.getDeal(reqLead.id, ["contacts"]);
	const [leadContact] = lead._embedded.contacts.filter(contact => contact.is_main);

	if (!leadContact) {
		return res.json("Lead have no contacts");
	}

	const contact = await api.getContact(leadContact.id);
	const price = getPrice(contact, lead);

	if (Number(lead.price) !== price) {

		api.updateDeals([{
			id: Number(lead.id),
			price
		}]);

		const tasks = await api.getTasks(lead.id, TASK_TYPE_ID);
		if(!tasks.filter(task => task.is_completed === false).length) {
			const priceCheckTask = {
				entity_id: lead.id,
				entity_type: "leads",
				task_type_id: TASK_TYPE_ID, 
				text: PRICE_CHECK_TASK_TEXT, 
				complete_till: Math.floor(Date.now() / 1000) + DAY_SECONDS,
				responsible_user_id: lead.responsible_user_id
			};
			api.createTasks(priceCheckTask);
		}
	}
	
	return res.json("ok");
});

app.post("/api/tasks", async (req, res) => {
	const tasks = req.body.task.update;
	const [task] = tasks.filter(task => Number(task.task_type) === TASK_TYPE_ID);

	if(task) {
		const priceCheckedNote = {
			entity_id: Number(task.element_id),
			note_type: "common",
			params: { text: CHECKED_NOTE_TEXT}			
		};
		api.createNotes(priceCheckedNote);
	}
	
	return res.json("ok");
});

app.listen(config.PORT, () => logger.debug("Server started on ", config.PORT));