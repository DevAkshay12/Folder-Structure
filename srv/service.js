const cds = require('@sap/cds');

module.exports = async function () {
    let {
        Folder,
        Data
    } = this.entities;

    this.on("data", async (req) => {
        console.log(req);
        let id = req.data.id;
        let data = req.data.Data;
        let dataArray = data.split(',');
        var sqlDatat
        for (let i = 0; i < dataArray.length; i++) {
            sqlDatat = await SELECT.from(Data).where`id=${id} AND Data=${dataArray[i]}`
            if (sqlDatat.length != 0) {
                let v1 = sqlDatat[0].id;
                let v2 = sqlDatat[0].Data;
                await DELETE.from(Data).where`id=${v1} AND Data=${v2}`;
            }
            console.log(sqlDatat.length);
        }
        for (let i = 0; i < dataArray.length; i++) {
            // Insert each value separately with the same ID
            const Insert = await INSERT.into(Data).entries({
                id: id,
                Data: dataArray[i].trim() // Trim whitespace from each value
            });
            console.log(Insert);
        }

        return "success"
    })

    this.on("getdata", async (req) => {
        console.log(req);
        let data = await SELECT`id,Data`.from(Data);
        let data1 = await SELECT`id,Folder_Name`.from(Folder);

        return JSON.stringify({
            data: data,
            data1: data1,
        });
    })
    this.on("remove", async (req) => {
        console.log(req);
        let check = await SELECT.from(Data).where`id=${req.data.id} AND Data=${req.data.fold}`
        if(check.length > 0)
        {
            await DELETE.from(Data).where`id=${req.data.id} AND Data=${req.data.fold}`;
        } 
          
        return "deleted"
    })
    this.on("check", async (req) => {
        console.log();
        const values = req.data.id;
        const array_values = values.split(',');
        const missingValues = [];
        let check = await SELECT`id,Data`.from(Data);
        for (let i = 0; i < check.length; i++) {
            const dataValue = check[i].Data;
            if (!array_values.includes(dataValue)) {
                missingValues.push(dataValue);
            }
        }
        console.log();
        if(missingValues.length != 0)
        {
            for(let j = 0;j<missingValues.length;j++)
            {
               let deleted =  await DELETE.from(Data).where`id=${req.data.fold} AND Data=${missingValues[j]}`; 
            }
        }

        return "removed unselected value"
    })
    

    this.on("delete1", async (req) => {
       console.log();
       let deleted =  await DELETE.from(Data).where`id=${req.data.id}`;
       console.log(deleted);
       return "executed delete function"
    })


}