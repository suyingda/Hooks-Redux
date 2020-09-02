# Hooks-Redux @2

项目中只需关注操作module数据模块
```$xslt
module  actions  reducer
```

###use create initialIndex
```js
import React from 'react';
import { SProvider, store } from 'hooks-redux';
import CustomTemplate from './index';
function STemplate() {
    return (
        <SProvider store={store} >
            <CustomTemplate />
        </SProvider>
    );
}

export default STemplate;
```

children template

###base
```js
import { SConsumer } from '@State';
const mapStateToProps = (state) => ({
    ...state,
});
const mapDispatchToProps = {
    ContentEdit: 'ContentEdit ',  
};

export default  SConsumer(
    { mapStateToProps, mapDispatchToProps }, 
    (props) => <FormCustomEdit {...props}/>
);
```
###form special @3+

```js
const FormCustomEdit = Form.create()(CustomEdit);
export default  SConsumer(
    { mapStateToProps, mapDispatchToProps }, 
    (props) => <FormCustomEdit {...props}/>
);
```
