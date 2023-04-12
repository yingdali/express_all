<template>
    <div id="index_container">
        <div id="search_wrap">
            <search></search>
        </div>
        <div id="map_wrap">
            <map-container></map-container>
        </div>
        <div id="heatMap_wrap">
            <!-- <heat-map-search-box></heat-map-search-box> -->
            <router-link to="/table"
                ><a href="" style="color: #000">Table</a> | </router-link
            >
            <router-link to="/echars"
                ><a href="" style="color: #000">echars |</a></router-link
            >
                   <router-link to="/encrypt"
                ><a href="" style="color: #000">encrypt</a></router-link
            >
        </div>
        <div id="shadow"></div>
        <!-- <div id="info_window_wrap">
      <info-window></info-window>
    </div> -->
    </div>
</template>

<script>
import MapContainer from '@/components/MapContainer/MapContainer.vue'
import Search from '@/components/Search/Search.vue'
// import HeatMapSearchBox from '@/components/heatMapSearchBox/heatMapSearchBox.vue'
import InfoWindow from '@/components/InfoWindow/InfoWindow.vue'
import Table from '@/components/table/Table.vue'
export default {
    components: { MapContainer, Search, InfoWindow, Table }
}
</script>

   
<style lang="less" scoped>
#index_container {
    overflow: hidden;
    // background-color: rgb(207, 229, 248);
    height: 100%;
    width: 100%;
    position: relative;
    #map_wrap {
        z-index: 10;
        position: absolute;
        top: 52%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 80%;
        width: 100%;
    }
    #search_wrap {
        z-index: 10;
        position: absolute;
        top: 5%;
        left: 50%;
        height: 60px;
        width: 400px;
        transform: translate(-50%, -50%);
    }
    #shadow {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgb(255, 255, 255);
    }
    #heatMap_wrap {
        z-index: 12;
        position: absolute;
        top: 10%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    #info_window_wrap {
        z-index: 100;
        position: absolute;
    }
}
</style>