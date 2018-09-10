export default (user) => {
    return `
The following info is for your new applicant:
<ul>
<li>First Name: ${user.firstName} </li>
<li>last name: ${user.lastName} </li>
<li>Email: ${user.email} </li>
<li>Address: ${user.streetAddress} ${user.city}, ${user.state} ${user.zipCode} </li>
<li>Age: ${user.age} </li>
<li>Ethnicity: ${user.ethnicity} </li>
<li>Education Level: ${user.educationLevel} </li>
<li>In Military?: ${user.inMilitary ? "Yes" : "No"} </li>
<li>Income: ${user.income} </li>
</ul>
<br />
Best Regards,
<br />
The Youth Wins Team
`
}
