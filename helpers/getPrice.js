const utils = require("../utils");
const api = require("../api");

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

async function getPrice(leadContactId, leadCustomFields) {
	const contact = await api.getContact(leadContactId);
	
	let leadServices = utils.getFieldValues(leadCustomFields, LEAD_SERVICES_FIELD_ID);
	leadServices = CONTACT_SERVICES_FIELDS.filter((field) => {
		return leadServices.includes(field.name);
	});

	let price = 0;
	for (const field of leadServices) {
		price += Number(utils.getFieldValue(contact.custom_fields_values, field.id));
	}

	return price;
}

module.exports = getPrice;