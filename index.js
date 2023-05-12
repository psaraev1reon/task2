const express = require("express");
const api = require("./api");
const logger = require("./logger");
const config = require("./config");
const utils = require("./utils");

const LEAD_SERVICES_FIELD_ID = 1058235;
const CONTACT_SERVICES_FIELDS = [
	{ 
		id: 1058065,
		name: "Лазерное омоложение лица"
	}, 
	{
		id: 1058073,
		name: "Ультразвуковой лифтинг"
	}, 
	{
		id: 1058075,
		name: "Лазерное удаление сосудов"
	}, 
	{
		id: 1058125,
		name: "Коррекция мимических морщин"
	}, 
	{
		id: 1058127,
		name: "Лазерная эпиляция"
	}
];

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/leads", async (req, res) => {
	const [reqLead] = req.body.leads.update || req.body.leads.add;
	const lead = await api.getDeal(reqLead.id, ["contacts"]);
	const [leadContact] = lead._embedded.contacts.filter(contact => contact.is_main);

	if (!leadContact) {
		return res.json("ok");
	}

	const contact = await api.getContact(leadContact.id);
	
	let leadServices = utils.getFieldValues(lead.custom_fields_values, LEAD_SERVICES_FIELD_ID);
	leadServices = CONTACT_SERVICES_FIELDS.filter((field) => {
		return leadServices.includes(field.name);
	});

	let price = 0;
	for (const field of leadServices) {
		price += Number(utils.getFieldValue(contact.custom_fields_values, field.id));
	}

	if (Number(lead.price) !== Number(price)) {
		api.updateDeals([{
			id: Number(lead.id),
			price
		}]);
	}
	
	return res.json("ok");
});

app.listen(config.PORT, () => logger.debug("Server started on ", config.PORT));