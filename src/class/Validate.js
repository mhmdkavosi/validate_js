import Validation from "./Validation";

export default class Validate extends Validation{
    between_value(){
        let currentData=this.currentData;
        if(parseInt(currentData.dataValue)<=parseInt(currentData.ruleValue[0]) || parseInt(currentData.dataValue)>=parseInt(currentData.ruleValue[1]))
            this.makeMessage(this.between_value.name);
    }
    between_len(){
        let currentData=this.currentData;
        if(this.size(currentData.dataValue)<=currentData.ruleValue[0] || this.size(currentData.dataValue)>=currentData.ruleValue[1])
            this.makeMessage(this.between_len.name);
    }
    len(){
        let currentData=this.currentData;
        if(parseInt(this.size(currentData.dataValue))!==parseInt(currentData.ruleValue[0]))
            this.makeMessage(this.len.name);
    }
    min_len(){
        let currentData=this.currentData;
        if(this.size(currentData.dataValue)<=currentData.ruleValue[0])
            this.makeMessage(this.min.name);
    }
    max_len(){
        let currentData=this.currentData;
        if(this.size(currentData.dataValue)>=currentData.ruleValue[0])
            this.makeMessage(this.max.name);
    }
    min_value(){
        let currentData=this.currentData;
        if(currentData.dataValue>=currentData.ruleValue[0])
            this.makeMessage(this.max.name);
    }
    max_value(){
        let currentData=this.currentData;
        if(currentData.dataValue>=currentData.ruleValue[0])
            this.makeMessage(this.max.name);
    }
    json(){
        let currentData=this.currentData;
        try {
            JSON.parse(currentData.dataValue);
        } catch (e) {
            this.makeMessage(this.json.name);
        }
    }
    boolean(){
        let currentData=this.currentData;
        if(typeof currentData.dataValue!=='boolean')
            this.makeMessage(this.boolean.name);
    }
    integer(){
        let currentData=this.currentData;
        if(typeof currentData.dataValue!=='number')
            this.makeMessage(this.integer.name);
    }
    required(){
        let currentData=this.currentData;
        if(this.is_empty(currentData.dataValue))
            this.makeMessage(this.required.name);
    }
    confirmed(){
        let currentData=this.currentData;
        if(this.getValueData(currentData.ruleValue[0])!=currentData.dataValue)
            this.makeMessage(this.confirmed.name);
    }
    email(){
        let currentData=this.currentData;
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i
        if(!expression.test(String(currentData.dataValue).toLowerCase()))
            this.makeMessage(this.email.name);
    }
    mime(){
        let currentData=this.currentData;
        let mime_type=currentData.dataValue.type.split('/')[1];
        if (!currentData.ruleValue.includes(mime_type))
            this.makeMessage(this.mime.name);
    }
    min_file_size(){
        let currentData=this.currentData;
        let bytes=currentData.dataValue.size;
        let convert_to_kb=Math.round(bytes/1024);
        if (convert_to_kb<=currentData.ruleValue[0])
            this.makeMessage(this.min_file_size.name);
    }
    max_file_size(){
        let currentData=this.currentData;
        let bytes=currentData.dataValue.size;
        let convert_to_kb=Math.round(bytes/1024);
        if (convert_to_kb>=currentData.ruleValue[0])
            this.makeMessage(this.max_file_size.name);
    }
    date() {
        let currentData = this.currentData;
        let date = new Date(currentData.dataValue);
        if (date.toString().toLowerCase() === 'invalid date')
            this.makeMessage(this.date.name);
    }
    ip() {
        let currentData = this.currentData;
        if (!/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(currentData.dataValue))
            this.makeMessage(this.ip.name);
    }
    url() {
        let currentData = this.currentData;
        let pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        if(!pattern.test(currentData.dataValue))
            this.makeMessage(this.url.name);
    }
    alpha(){
        let currentData = this.currentData;
        let pattern = new RegExp(/^[A-Za-zا-ی]+$/);
        if(!pattern.test(currentData.dataValue))
            this.makeMessage(this.alpha.name);
    }
    alpha_num(){
        let currentData = this.currentData;
        let pattern = new RegExp(/^[0-9A-Za-zا-ی]+$/);
        if(!pattern.test(currentData.dataValue))
            this.makeMessage(this.alpha_num.name);
    }
}