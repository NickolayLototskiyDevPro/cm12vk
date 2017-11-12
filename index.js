
/* participantObject EXAMPLE */
/* Example: { firstName: 'Sergey', lastName: 'Zotenko', seniorityLevel: 'intermediate' } */
// const participantObject = {
//     firstName: string,
//     lastName: string,
//     seniorityLevel: string
// }

/* pricingObject EXAMPLE */
/* Example: { 'junior': 10 } */
// const participant = {
//     firstName: string,
//     lastName: string,
//     seniorityLevel: string, 
//     getInstance() { return this }
// }

const project = {
    participants: [],
    pricing: { },
    isBusy: false,
    //getInstance() { return this }
    /* implement initialization of the object */
    /* participants - predefined array of participants */
    /* pricing - predefined object (keyvalue collection) of pricing */
    init(participants, pricing) { 
        if(Array.isArray(participants) && typeof (pricing) == 'object')
        {
            this.participants = participants;
            this.pricing = pricing;
        }
    },

    /* pass found participant into callback, stops on first match */
    /* functor - function that will be executed for elements of participants array */
    /* callbackFunction - function that will be executed with found participant as argument or with null if not */
    /* callbackFunction (participant) => {} */
    findParticipant(functor, callbackFunction) { 

        if(this.isBusy)
        {
            return false;
        }
        this.isBusy = true;
        setTimeout(() => {

        let elem  = this.participants.find(functor)
                    if (elem){
                        this.isBusy = false;
                       callbackFunction(elem);
                    }
                    else {
                        this.isBusy = false;
                        callbackFunction(null);
                    }
                 }, 100)
            },

    /* pass array of found participants into callback */
    /* functor - function that will be
     executed for elements of participants array */
    /* callbackFunction - function that will be executed with array of found participants as argument or empty array if not */
    /* callbackFunction (participantsArray) => {} */
    findParticipants(functor, callbackFunction) { 
        if(this.isBusy)
        {
            return false
        }
        this.isBusy = true
        setTimeout(() => {
            
            let array_part = [];
            for(let i = 0; i<this.participants.length;i++)
            {
                let p = this.participants.slice(i,this.participants.length);
                let findElement =  p.find(functor)
                if(findElement){
                    array_part.push(findElement);
                }
                    
            }
            this.isBusy = false;
            callbackFunction(array_part);
        }, 100)
    },

    /* push new participant into this.participants array */
    /* callbackFunction - function that will be executed when job will be done */
    /* (err) => {} */
    addParticipant(participant, callbackFunction) { 
        if (this.isBusy){
            return false
        }
        this.isBusy = true;

        setTimeout(() => {
                
            if (participant.seniorityLevel){
                this.participants.push(participant)
                this.isBusy = false;
                callbackFunction()
            }
            else{
                this.isBusy = false;
                callbackFunction("Object is not found")
            }
        },100)
    },	
    /* push new participant into this.participants array */
    /* callback should receive removed participant */
    /* callbackFunction - function that will be executed with object of removed participant or null if participant wasn't found when job will be done */
    removeParticipant(participantObject, callbackFunction) { 
        if (this.isBusy){
            return false
        }
        this.isBusy = true;
        setTimeout(() => {
        let isDeleted = false;
        try{
            for (let i = 0;i< this.participants.length;i++){
                if (JSON.stringify(this.participants[i]) === JSON.stringify(participantObject)){
                    this.participants.splice(i,1);
                    isDeleted = true;
                    break;
                }			
            }
            if (!isDeleted) {
                this.isBusy = false;
                callbackFunction(null);
            }
    
            this.isBusy = false;
            callbackFunction(participantObject); 
        }
        catch (e){
            this.isBusy = false;
            callbackFunction(e);
        }
      },1000)

    },
    /* Extends this.pricing with new field or change existing */
    /* callbackFunction - function that will be executed when job will be done, doesn't take any arguments */
    setPricing(participantPriceObject, callbackFunction) { 
        if (this.isBusy){
            return false
        }
        this.isBusy = true
        let priceObjKey = Object.keys(participantPriceObject)[0];
        this.pricing[priceObjKey] = participantPriceObject[priceObjKey];
        callbackFunction();
        this.isBusy = false
    },

    /* calculates salary of all participants in the given period */
    /* periodInDays, has type number, one day is equal 8 working hours */
    calculateSalary(periodInDays) { 
        let result = 0;
        for (let i = 0; i<periodInDays; i++)
        {
            for (partc of this.participants){
                let pr =  this.pricing[partc.seniorityLevel];
                if(pr){
                result += this.pricing[partc.seniorityLevel] * 8;
                }
                else{
                    throw("pricing wasn't found");
                }
            }
        }
        return result;
    }
}
var projectModule = (function () {
    var instance;
 
    function createInstance() {
        var object = project;
        return object;
    }
 
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();
 


module.exports = {
    firstName: 'Elizaveta',
    lastName: 'Chernysh',
    task: projectModule.getInstance()
}
