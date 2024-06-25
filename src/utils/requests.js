const URL = `${import.meta.env.APP_API_URL}`
import { v4 as uuidv4 } from 'uuid'


export const handleGetDiscount = async (formData) => {
    try {
        const responce = await fetch(`${URL}/sale/send`, {
            method: 'POST',
            headers: {
                'Contett-Type': 'application/json'
            }, //multipart/form-data
            body: JSON.stringify({...formData, id: uuidv4()}),
        })
        const data = await responce.json()
        if (!responce.ok) {
            throw new Error('Failed to send a discount request')
        } else {
            
        }
        return data
        
    } catch (error) {
        console.log(error);
    }

}