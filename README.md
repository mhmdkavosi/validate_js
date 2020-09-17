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
```
npm i validation-rule-base
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

