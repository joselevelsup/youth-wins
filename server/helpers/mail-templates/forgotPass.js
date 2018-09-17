export default (id) => {
    return `
You have requested to reset your password. Please click the link below to reset your password:
<br />
<a href="http://${process.env.SITE}/#/forgot?u=${id}">Click to reset password</a>
`
}
