import Messages from './../data/messages';
let translate_methods=['confirmed'];
let lang_session='lang_validation';
let default_lang='fa';
export default class Validation {
    constructor(){
        this.errors=[];
        this.isError=true;
        this.attributes={};
        this.data=[];
        this.currentData= {
            attribute: '',
            rule: '',
            ruleValue: '',
            dataValue: ''
        };
        this.captions=[];
        this.validationData=Messages[this.get_locale() || default_lang];
    }
    init(data,rules){
        this.attributes=rules;
        this.data=data;
        return this;
    }
    setCaption(caption){
        this.currentData.caption=caption;
        return this;
    }
    setCurrentData(attribute,rule,ruleValue,dataValue){
        this.currentData={
            attribute: attribute,
            rule: rule,
            ruleValue: ruleValue,
            dataValue: dataValue
        }
    }
    validate(){
        for (let property in this.attributes) {
            let property_value=this.getValueData(property);
            let rules=this.makeArrayRules(this.attributes[property]);
            rules.forEach(function (ruleObject) {
                let funcName=ruleObject.rule.toLowerCase();
                this.setCurrentData(property,ruleObject.rule,ruleObject.value,property_value);
                try {
                    this[funcName]();
                }catch (e) {
                    this.makeMessage(funcName);
                }
            }.bind(this));
        }
    }
    makeArrayRules(rulesString){
        let rules=rulesString.split('|');
        let object_rules=[];
        rules.forEach(function (rule) {
            let split_rule=rule.split(':');
            object_rules.push({
                rule:split_rule[0],
                value:(split_rule[1]) ? split_rule[1].split(',') : []
            });
        });
        return object_rules;
    }
    getAttribute(key){
        return this.attributes[key];
    }
    getValueData(key){
        return this.data[key];
    }
    getData(key){
        return this.data[key];
    }
    setIsValid(value){
        this.isError=value;
    }
    setCaptions(captions){
        this.captions=captions;
        return this;
    }
    pushError(key,message){
        let errors=this.errors;
        if (key in errors) {
            let error_with_key=this.errors[key];
            error_with_key.push(message.toString());
            this.errors[key] =error_with_key;
        }
        else
            this.errors[key]=[message.toString()];
    }
    makeMessage(){
        let currentData=this.currentData;
        let message='';
        let validationDataMessage=this.getValidationDataMessage(currentData.rule);
        let value_message=this.make_value_message();
        message=this.str_replace(validationDataMessage,[':attribute',':first_value',':second_value',':third_value'],value_message);
        this.pushError(currentData.attribute,message);
        this.setIsValid(false);
    }
    make_value_message(){
        let currentData=this.currentData;
        let validationDataAttribute=this.getCaptionAttribute(currentData.attribute) || this.getValidationDataAttribute(currentData.attribute);
        let first_value=currentData.ruleValue[0] || '';
        let second_value=currentData.ruleValue[1]|| '';
        let third_value=currentData.ruleValue[2] || '';
        if (translate_methods.includes(currentData.rule))
        {
            first_value=this.getCaptionAttribute(first_value) || this.getValidationDataAttribute(first_value);
            second_value=this.getCaptionAttribute(second_value) || this.getValidationDataAttribute(second_value);
            third_value=this.getCaptionAttribute(third_value) || this.getValidationDataAttribute(third_value);
        }
        return [
            validationDataAttribute,
            first_value,
            second_value,
            third_value
        ];
    }
    getValidationDataAttribute(attribute){
        let attr='';
        if (attribute.toLowerCase() in this.validationData.attribute)
            attr=this.validationData.attribute[attribute.toLowerCase()];
        else
            attr=attribute.toLowerCase();
        return attr ;
    }
    getValidationDataMessage(rule){
        return this.validationData.messages[rule.toLowerCase()];
    }
    getCaptionAttribute(attribute){
        return this.captions[attribute];
    }
    isValid(){
        return this.isError;
    }
    getErrors(){
        return this.errors;
    }
    getError(key){
        return this.errors[key];
    }
    getFirstError(){
        let errors=this.errors;
        if (this.is_empty(errors))
            return '';
        let key = Object.keys(errors)[0];
        return  errors[key][0];
    }
    is_empty(data)
    {
        if(typeof(data) == 'number' || typeof(data) == 'boolean')return false;
        if(typeof(data) == 'undefined' || data === null) return true;
        let count=0;
        for (let property in data)
            count++;
        return count == 0;
    }
    size(data){
        let count = 0;
        for(let i in data)
            if(data.hasOwnProperty(i))
                count ++;
        return count;
    }
    str_replace(value, keys, replacement) {
        let res = value;
        for (let i = 0; i < keys.length; i++)res = res.replace(keys[i], replacement[i]);
        return res;
    }
    set_locale(lang='fa'){
        let current_lang=this.get_locale();
        if (lang!==current_lang.toString())
            localStorage.setItem(lang_session,lang);
    }
    get_locale(){
        return localStorage.getItem(lang_session) || default_lang;
    }
}