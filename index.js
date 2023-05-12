const express = require("express");
const api = require("./api");
const logger = require("./logger");
const config = require("./config");
const getPrice = require("./helpers/getPrice");

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

	const price = await getPrice(leadContact.id, lead.custom_fields_values);

	if (Number(lead.price) !== Number(price)) {
		api.updateDeals([{
			id: Number(lead.id),
			price
		}]);

	}
	
	return res.json("ok");
});

app.listen(config.PORT, () => logger.debug("Server started on ", config.PORT));