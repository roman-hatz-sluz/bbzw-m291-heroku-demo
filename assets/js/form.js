const submit = document.getElementById("submit")
const email = document.getElementById("email")
submit.disabled = true

const validate = () => {
    if (email.value == "") {
        submit.disabled = true
    } else {
        submit.disabled = false
    }
}

email.addEventListener("keyup", (event) => {
    validate()
})


// neue Validierung beim Submit
submit.addEventListener("click", async (event) => {
    event.preventDefault()
    databaseClient.insertInto("user", ["email"], [email.value])
    location.href = "./game.html"
})