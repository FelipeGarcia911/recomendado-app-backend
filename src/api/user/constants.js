const RESTRICTED_FIELDS = ["password", "__v"]
const FORBIDDEN_FIELDS = `-${RESTRICTED_FIELDS.join(" -")}`

module.exports = { RESTRICTED_FIELDS, FORBIDDEN_FIELDS }
