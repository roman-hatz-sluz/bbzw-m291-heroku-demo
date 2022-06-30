/*
Sie müssen nicht wissen, wie executeSqlQuery funktioniert. 
Sie müssen nur wissen, wie Sie diesen Code verwenden können bei form.js. 
*/


const databaseClient = {
  // Account Daten
  data: {
    url: "/sql",
    pw: "37b46eb1",
    sql: ""
  },

  // HTTP Request an die Datenbank
  // Mitgegeben wird ein SQL Query als String 
  executeSqlQuery: async (sql) => {
    databaseClient.data.sql = sql
    const response = await fetch(databaseClient.data.url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(databaseClient.data)
    })
    const result = await response.json()
    console.log("SQL Query executed: ", result, sql)
    
    return result
  },

  // Mitgegeben wird der Name der Tabelle als String, die Felder als Array und die Werte als Array.
  // Beispiel: databaseClient.insertInto("customers", ["firstname", "email"], [firstname.value, email.value])
  insertInto: async (tableName = "users", fields = ["email"], values = []) => {
    const sql = `INSERT INTO ${tableName} (${fields.join(",")}) VALUES ('${values.join("','")}')`
    return await databaseClient.executeSqlQuery(sql)
  }
}
