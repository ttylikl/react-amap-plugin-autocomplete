import React, { Component } from 'react';
import { Map } from 'react-amap';
import Autocomplete from 'react-amap-plugin-autocomplete';

const pluginProps = {};
const style = {};
const amapkey=''; // 请填入自己的amapkey
const mapPlugins = [
    'MapType',
    'Scale',
    'OverView',
    'ControlBar', // v1.1.0 新增
];

class AmapAutocomplete extends Component {

    constructor(props){
        super(props);
        this.state={
            center:{
                longitude:116.292829,
                latitude:39.946039
            }
        }
    }
    
    // on select item
    selectfunc = (e) => { 
        console.log(e);
        if(e.poi.location) {
            this.setState({center:{longitude: e.poi.location.lng, latitude: e.poi.location.lat}})
        } 
    }
  
    render() {
        return (
        // render
        <div amapkey={amapkey} style={{ width: 600, height: 400}}>
            <Map center={this.state.center} plugins={mapPlugins}>
                <Autocomplete options={pluginProps} onSelect={(e)=>this.selectfunc(e)} style={style} placeholder='搜索'/>
            </Map>
        </div>
        )
    }
}

export default AmapAutocomplete;
