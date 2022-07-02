class recordsModel{
    static validateRecord(record){
        const newRecord = {
            "name": record.name,
            "location": record.location,
            "data": record.data
        }

        return record
    }
}


export default recordsModel