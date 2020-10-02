# Validation Laravel Base - Js Standalone Validation Library
Js Standalone library for validating data.
## Features

-   Validate type of variables.
-   Validate size,lenght.
-   `FILES` validation.
-   Custom attribute caption.
-  Multi language messages.

## Quick Start
#### 💿 Installation
[on npm](https://www.npmjs.com/package/validation-rule-base)
```
npm i validation-rule-base
```
CDN
```
https://cdn.jsdelivr.net/npm/validation-rule-base/dist/validation.js
```

## 🚀 Import
```
import Validate from "validation-rule-base/src/class/Validate"
Or
const Validate=require('validation-rule-base/src/class/Validate')
```
## 📝Config
you can set default messages language with ```set_locale```
```
let validation=new Validate();
validation.set_locale(); //default language 'fa'
Or
validation.set_locale('en'); //set default language to 'en'
```

## ⚡ Usage
#### Initial data
```
let validation=new Validate();

let data={
  full_name:'mohammad kavosi',
  birthday_date:'1998/08/28',
  email:'kavosi1010@gmail.com'
};

let rules={
  full_name:'required|min_len:20|max_len:40',
  birthday_date:'required|date',
  email:'required|email',
};

validation.init(data,rules).validate();
```

## ⏳ Validate
#### check result validation
```
if (!validation.isValid()){  // return true or false
	// something ....
  }
  ```

  #### get first message
  ```

  validation.getFirstError();

  /*
default language 'fa'
.نام و نام خانوادگی حداقل باید 20 کاراکتر باشد
or 'en'
The full_name must be at least 20.
*/
  ```
#### get all messages
```
validation.getErrors(); // return array
```
#### get  message with key
```
validation.getErrors('full_name'); // return array

```
#### set custom caption for attribute
```
let captions={
  full_name:'نام و نام خانوادگی'
};
validation.setCaptions(captions);
```

## 🎁 Rules
#### required
The field under validation must be present in the input data and not empty. A field is considered "empty" if one of the following conditions are true:
-   The value is `null`.
-   The value is an empty string.
-   The value is an empty array or empty `Countable` object.


#### email
The field under validation must be formatted as an e-mail address.
#### IP
The field under validation must be an IP address.
#### URL
The field under validation must be a valid URL.
#### date
The field under validation must be a valid.
#### integer
The field under validation must be an integer.
#### boolean
The field under validation must be an boolean.
#### json
The field under validation must be a valid JSON string..
#### min_value:_value_
The field under validation must have a minimum _value_ .
#### max_value:_value_
The field under validation must have a maximum _value_ .
#### between_value:_min_,_max_
The field under validation must have a size between the given _min_ and _max_.
#### len:_value_
The field under validation must have an exact length of _value_.
#### min_len:_value_
The field under validation must have an exact minimum length of _value_.
#### max_len:_value_
The field under validation must have an exact maximum length of _value_.
#### between_len:_min_,_max_
The field under validation must have a length between the given _min_ and _max_.
#### confirmed:_confirmation_name_
The field under validation must have a matching field of `foo_confirmation`. For example, if the field under validation is `password`, a matching `password_confirmation` field must be present in the input.
#### mime:_(type,...)_
The file under validation must have a MIME type corresponding to one of the listed extensions.
```
'profile' => 'mimes:jpeg,bmp,png'
```
#### min_file_size:_value_(kb)
The field under validation must have a min file size matching the given _value_.
#### max_file_size:_value_(kb)
The field under validation must have a max file size matching the given _value_.
#### alpha
The field under validation must be entirely alphabetic characters.
#### alpha_num
The field under validation must be entirely alpha-numeric characters.
