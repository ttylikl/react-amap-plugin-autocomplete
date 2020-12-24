import React,{ Component }  from 'react';

// https://lbs.amap.com/api/javascript-api/reference/search#m_AutocompleteOptions
class Autocomplete extends Component {
  constructor(props){
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount(){
    this.loadWithOptions(this.props);
  }

  loadWithOptions(props){
    this.map = props.__map__;  
    if (!this.map) {
      console.log('组件必须作为 Map 的子组件使用');
      return;
    }
    if(!props.options){
      console.log('必须指定Autocomplete插件的配置参数');
      return;
    }
    if(typeof props.onSelect !== 'function') {
      console.log('必须指定onSelect回调函数');
      return;
    }
    this.map.plugin(['AMap.Autocomplete', 'AMap.Geocoder'], () => {
      let opts ={input: 'autoinput'};
      Object.assign(opts, props.options);
      console.log('init with options:', opts);
      const auto = new window.AMap.Autocomplete(opts);
      this.map.addControl(auto);
      window.AMap.event.addListener(auto, "select", this.onSelect);//注册监听，当选中某条记录时会触发
      const geoloc = new window.AMap.Geocoder({});
      console.log(geoloc);
      this.map.addControl(geoloc);
      this.geoloc = geoloc;
      this.auto = auto;
    });

  }

  onSelect(e) {
    if(!e.poi.location) {
      const poi = e.poi;
      this.geoloc && this.geoloc.getLocation(poi.district + poi.address, (status, result) =>{
        console.log('getLocation', status, result);
        if(result && result.info === "OK"){
          e.poi.location = result.geocodes[0].location;
        }
        this.props.onSelect(e);
      })
      return ;
    }
    this.props.onSelect(e);
  }

  render(){
    if (this.props.options && this.props.options.input ){
      // console.log('no input ctrl:', this.props, this.props.options);
      return null;
    }
    return <input id='autoinput' placeholder={this.props.placeholder} style={this.props.style} className={this.props.className} />
  }
}

module.exports = Autocomplete;
