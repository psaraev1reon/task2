const utils = require("../utils");

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

function getPrice(contact, lead) {	

	const checkedLeadServices = utils.getFieldValues(lead.custom_fields_values, LEAD_SERVICES_FIELD_ID);
	const targetLeadServices = CONTACT_SERVICES_FIELDS.filter((field) => {
		return checkedLeadServices.includes(field.name);
	});

	const price = targetLeadServices.reduce((sum, value) => sum + Number(utils.getFieldValue(contact.custom_fields_values, value.id)), 0);

	return price;
}

module.exports = getPrice;