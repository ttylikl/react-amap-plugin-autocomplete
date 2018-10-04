# Autocomplete Plugin for [react-amap](https://elemefe.github.io/react-amap/)

Usage:
```
npm install react-amap-plugin-autocomplete
```

Configurable props:

Visit [AMap doc](https://lbs.amap.com/api/javascript-api/reference/search#m_AutocompleteOptions) for details about **ALL** prop;


```
import { Map } from 'react-amap';
import Autocomplete from 'react-amap-plugin-autocomplete';

const pluginProps = {
  input: <input element id>   // optional
  ...
}

// inner input element style
const style = {
  ...
}

// on select item
selectfunc = (e) => { 
  if(e.poi.location) {
    this.setState({center:{longitude: e.poi.location.lng, latitude: e.poi.location.lat}})
  } 
}

// render
<Map>
   <Autocomplete options={pluginProps} onSelect={(e)=>this.selectfunc(e)} style={style} placeholder='搜索'/>
</Map>

```