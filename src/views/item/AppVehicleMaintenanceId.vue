<template>
 <div>
      <v-toolbar flat>
        <v-toolbar-title> Редактирование записи т.о.</v-toolbar-title>
        
        <v-spacer></v-spacer>
          <template>
            <v-btn color="success" class="mb-2" @click="save()">{{formAutoTitle}}</v-btn>
            <v-btn color="primary" class="mb-2 ml-1" @click="save()">{{formDriveTitle}}</v-btn>
          </template>  
    </v-toolbar>

<template>
  <v-card>
    <v-toolbar>
      <v-tabs
        slot="extension"
        v-model="tabs"
        background-color="transparent"
      >
        <v-tab> Информация </v-tab>
        <v-tab> Состояние ТС </v-tab>
      </v-tabs>
    </v-toolbar>

    <v-tabs-items v-model="tabs">
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <template>
    <v-container>
      <v-row>
          <v-col cols="12" md="8">
                    <v-menu
                      ref="editedItem.dateMenu"
                      v-model="editedItem.dateMenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="editedItem.dateData"
                          label="Дата"
                          clearable
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        ref="editedItem.datePicker"
                        v-model="editedItem.dateData"
                        max="2050-01-01"
                        min="1950-01-01"
                      ></v-date-picker>
                  </v-menu>
        </v-col>
        <v-col cols="12" md="8">
        <v-select 
                        :items="auto" 
                        :item-text="item => item.model +'  '+ item.numberSymbol + '  ' + item.owner"
                       
                        item-value="_id"
                        v-model="editedItem.auto" 
                        label="Автомобиль">
                    </v-select>
        </v-col>
        <v-col cols="12" md="8">
             <v-select :items="typeJob" v-model="editedItem.typeJob" label="Вид работ"></v-select>
        </v-col>
        <v-col cols="12" md="8">
              <v-select :items="contragents" 
                        :item-text="item => item.name +'  '+ item.contactPerson"
                        item-value="_id" 
                         v-model="editedItem.contragent" 
                         label="Контрагент">
             </v-select>
        </v-col>
        <v-col cols="12" md="8">
          <v-text-field
            v-model="editedItem.autoRun"
            :counter="12"
            label="Пробег"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="8">
           <v-switch v-model="editedItem.foreginLicenceRegistration" class="ma-2" label="Иностранное свидетельство о регистрации"></v-switch>
        </v-col>
        <v-col cols="12" md="8">
            <p class="subtitle-1">Запчасти со склада</p>
        </v-col>
        <v-col cols="12" md="8" v-for="(row, index) in editedItem.parts" v-bind:key="index">
<v-autocomplete
              v-model="row.id"
              :disabled="isUpdating"
              :items="people"
              label="Запчасть"
              item-text="name"
              item-value="_id"
            >
              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                >
                {{ data.item.name }}  {{ data.item.brand }} Артикул: {{data.item.article}}
                </v-chip>
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-item-content v-text="data.item"></v-list-item-content>
                </template>
                <template v-else>
                  <v-list-item-content>
                    <v-list-item-title @click="select(data.item.summ, data.item.name, data.item.brand, data.item.article, index)" v-html="data.item.name +' '+ data.item.brand + ' ' + 'Артикул: ' + data.item.article"></v-list-item-title>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
            
           <v-text-field
            v-model="row.description"
            :counter="100"
            @input="addEvent(summRepository[index], index)"
            label="Количество"
            required
          ></v-text-field>
          <v-text-field
            v-model="row.percent"
            :counter="100"
            @input="addEvent(summRepository[index], index)"
            label="Надбавка парка"
            required
          ></v-text-field>
<v-toolbar flat>
<a v-on:click="removeElement(index);" style="color: red">Удалить</a>
        
        <v-spacer></v-spacer>
          
          <div style="background-color: orange;height: 2rem;padding: .4rem 1rem 1rem 1rem;text-align: -webkit-center; color: white;border-radius: 50px;">
            {{summRepository[index]}}
          </div>
</v-toolbar>                
        </v-col>
        <v-col cols="12" md="8">
            <v-btn @click="addRow" class="mx-2" fab dark color="indigo">
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
        </v-col>
        <v-col cols="12" md="8">
            <p class="subtitle-1">Другие запчасти</p>
        </v-col>
        <v-col cols="12" md="8" v-for="(item, i) in otherPart" v-bind:key="i + 1000">
          <v-text-field
            v-model="item.name"
            :counter="100"
            label="Наименование"
            required
          ></v-text-field>
           <v-text-field
            v-model="item.articale"
            :counter="100"
            label="Артикул"
            required
          ></v-text-field>
          <v-text-field
            v-model="item.howmuch"
            :counter="100"
            label="Количество"
            required
          ></v-text-field>
          <v-text-field
            v-model="item.price"
            :counter="100"
            label="Цена"
            @input="otherPrice(summRepositoryOther[i], i)"
            required
          ></v-text-field>
          <v-text-field
            v-model="item.percent"
            :counter="100"
            @input="otherPrice(summRepositoryOther[i], i)"
            label="Надбавка парка"
            required
          ></v-text-field>
<v-toolbar flat>
<a v-on:click="removeOterElement(i);" style="color: red">Удалить</a>
        
        <v-spacer></v-spacer>
          
          <div style="background-color: orange;height: 2rem;padding: .4rem 1rem 1rem 1rem;text-align: -webkit-center; color: white;border-radius: 50px;">
            {{summRepositoryOther[i]}}
          </div>
</v-toolbar> 
        </v-col>
        
      <v-col cols="12" md="8">
        <v-btn @click="addOterRow" class="mx-2" fab dark color="indigo">
              <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </v-col>

        <v-col cols="12" md="8">
            <p class="subtitle-1">Работы и их стоимость</p>
        </v-col>
        
         <v-col cols="12" md="8" v-for="(item, inx) in coastJobs" v-bind:key="inx + 2000">
          <v-text-field
            v-model="item.title"
            :counter="100"
            label="Наименование работ"
            required
          ></v-text-field>
           <v-text-field
            v-model="item.price"
            :counter="100"
            label="Стоимость работ"
            @input="coastJobsFunc()"
            required
          ></v-text-field>
          <v-text-field
            v-model="item.percent"
            :counter="100"
            @input="coastJobsFunc()"
            label="Надбавка парка"
            required
          ></v-text-field>
<v-toolbar flat>
<a v-on:click="removeCoastJobs(inx);" style="color: red">Удалить</a>
        
        <v-spacer></v-spacer>

</v-toolbar> 
        </v-col>
        <v-col cols="12" md="8">
        <v-btn @click="addCoastJob" class="mx-2" fab dark color="indigo">
              <v-icon dark>mdi-plus</v-icon>
        </v-btn>
        </v-col>
        <v-col cols="12" md="8">
          <v-text-field
            v-model="editedItem.resultDyagnostic"
            :counter="100"
            label="Результаты диагностики"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="8">
          <v-text-field
            v-model="editedItem.coastSparePart"
            :counter="100"
            label="Стоимость запчастей"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="8">
          <v-text-field
            v-model="editedItem.coastJobsAll"
            :counter="10"
            label="Стоимость работ"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="8">
             <v-select :items="status" v-model="editedItem.statusRes" label="Статус"></v-select>
        </v-col>
      </v-row>
    </v-container>
</template>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
          <v-container>
             <v-row>

         <v-col cols="12" md="8">
         <v-text-field
            v-model="editedItem.tyreBrand"
            :counter="100"
            label="Марка шин"
            required
          ></v-text-field> 
        </v-col>
         <v-col cols="12" md="8">
          <v-text-field
            v-model="editedItem.bodyCabineDamage"
            :counter="500"
            label="Повреждения кузова, оптики, ЛКП, элементов экстерьера"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="12">
                <v-toolbar-title>Оценка состояния автомобиля</v-toolbar-title>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="rating" v-model="editedItem.autoCleanliness" label="Чистота кузова"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="rating" v-model="editedItem.overallInteriorCleanliness" label="Общая чистота салона"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="rating" v-model="editedItem.stateCeling" label="Состояние потолка"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="rating" v-model="editedItem.statestatePassengerSeat" label="Состояние пассажирского сиденья"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="rating" v-model="editedItem.stateDriverSeat" label="Состояние водительского сиденья"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="rating" v-model="editedItem.stateSeatbelt" label="Состояние ремня безопастности"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="rating" v-model="editedItem.stateSteeringWheelAndSwitches" label="Состояние рулевого колеса и переключателей"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="rating" v-model="editedItem.statePanel" label="Состояние панели приборов"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="rating" v-model="editedItem.stateSwitchKPP" label="Состояние переключателя КПП"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="rating" v-model="editedItem.windscreenCondition" label="Состояние лобового стекла"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="rating" v-model="editedItem.stateLeftwindscreen" label="Состояние остальных стекол"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="rating" v-model="editedItem.trunkCondition" label="Состояние багажника"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="rating" v-model="editedItem.stateTyre" label="Состояние шин"></v-select>
         </v-col>
               </v-row>
    </v-container>
          </v-card-text>
        </v-card>
        
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
</div>
</template>

<script>
import axios from "axios"
  export default {
    name: 'AppVehicleId',
    data () {
      return {
        tabs: null,
        ok: false,
        auto: "",
        status: ["Ожидание", "Оплачен", "Удален"],
        typeJob: ["Ремонт", "Диагностика", "ДТП"],
        rating: ["1", "2", "3", "4", "5"],
        contragents: "",
        parts: [],
        otherPart:[],
        summRepository: [],
        summRepositoryOther: [],
        summCoastJobs: [],
        coastJobs: [],
        editedItem:{
                parts: [],
                otherPart:[],
                summRepository: [],
                summRepositoryOther: [],
                summCoastJobs: [],
                coastJobs: [],
                autoId: "",
                index: null,
                status: ["Ожидание", "Оплачен", "Удален"],
                statusChose: "",
                auto: null,
                typeJob: "",
                typeJobChose : "",
                autoRun: null,
                rating: ["1", "2", "3", "4", "5"],
                listJobs: null,
                contragent: null,
                contragents: null,
                statestatePassengerSeat: null,
                resultDyagnostic: null,
                coastSparePart: "",
                coastJobsAll: 0,
                statusRes: null,
                tyreBrand: null,
                bodyCabineDamage: null,
                autoCleanliness: null,
                overallInteriorCleanliness: null,
                stateCeling: null,
                statePassengerSeat: null,
                stateDriverSeat: null,
                stateSeatbelt: null,
                stateSteeringWheelAndSwitches: null,
                statePanel: null,
                stateSwitchKPP: null,
                windscreenCondition: null,
                stateLeftwindscreen: null,
                trunkCondition: null,
                stateTyre: null,
                foreginLicenceRegistration: false,
                dateMenu: null,
                dateData: null,
                datePicker: new Date().toISOString(),
                autoUpdate: true,
                isUpdating: false,
                name: '',
                people: [],
                title: '',
                summ: [],
               
              
        },
        dialog: false,
        editedIndex: -1,
      }
    },
    computed: {
      formDriveTitle () {
        return this.editedIndex === -1 ? 'Сохранить и выйти' : 'Редактировать и выйти'
      },
      formAutoTitle () {
        return this.editedIndex === -1 ? 'Сохранить' : 'Редактировать'
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    created () {
      this.initialize()
    },
    methods: {
      initialize () {
          axios({
            method: "get",
            url:"http://localhost:8081/selectTechnicalServiceDataOne?id="+this.$route.params.id
          })
          .then(response => {
            this.editedItem = response.data
           /// console.log(this.editedItem.parts[0][0].Value); 
            let arrs = this.editedItem.parts
            let arr = []
            let data = []
             
            for (let index = 0; index < arrs.length; index++) {
                arr = arrs[index]
              
                for (let indx = 0; indx < arr.length; indx++) {
                     if(arr[indx].Key == "title"){
                        data[indx] = {title: arr[indx].Value}
                     }
                     if(arr[indx].Key == "description"){
                       
                       
                        data[indx] = {title: arr[indx].Value}
                     }
                     if(arr[indx].Key == "percent"){
                        data[indx] = {title: arr[indx].Value}
                     }
                     if(arr[indx].Key == "id"){
                        data[indx] = {title: arr[indx].Value}
                     }
                          
                }
            }

           // console.log(data);
            this.editedItem.parts = data
            
          })
          .catch(error => {
            console.log(error)
          })

//automobiles 
        axios({
            method: "get",
            url:"http://localhost:8081/selecAutomobileData?token="+localStorage.getItem('auth')
          })
          .then(response => {
            this.auto = response.data
          })
          .catch(error => {
            console.log(error)
          })

// contaragent
          axios({
            method: "get",
            url:"http://localhost:8081/selectCounteragentData?token="+localStorage.getItem('auth')
          })
          .then(response => {
            this.contragents = response.data
          })
          .catch(error => {
            console.log(error)
          })
      },

      select(data, name, brand, article, item){
        this.parts[item].title = name + ' ' + brand + ' ' + article
        this.summRepository[item] = data
        this.summ[item] = data
      },
      getSumm(data){
        this.summRepository = data
      },
      otherPrice(summ, item){
       let n = parseInt(this.otherPart[item].price)
       let summEnd = parseInt(this.otherPart[item].howmuch)
       let plusPercent = 0

       this.summRepositoryOther[item] = n * summEnd

       if(this.otherPart[item].percent > 0){
                plusPercent = parseInt(this.summRepositoryOther[item]) / 100 * this.otherPart[item].percent
       }
       this.summRepositoryOther[item] = this.summRepositoryOther[item] + plusPercent
       this.getSummPartAll()
      },
      getJobsAll(){
        let summCoastJobs = 0
        let plusPercent = 0
        if (this.coastJobs !="" || this.coastJobs != [] || this.coastJobs != null) {
        let arr = this.coastJobs
            for (let index = 0; index < arr.length; index++) {
              summCoastJobs = parseInt(summCoastJobs) + parseInt(arr[index].price)
            
              if(arr[index].percent > 0){
                plusPercent = parseInt(summCoastJobs) / 100 * arr[index].percent
              }
            }
        }

        summCoastJobs = parseInt(summCoastJobs) + parseInt(plusPercent)
        
        return parseInt(summCoastJobs)
      },
      getSummPartAll(){
        let summ = 0
        let summOtherPart = 0

        if (this.summRepository !="" || this.summRepository != [] || this.summRepository != null) {
        let arr = this.summRepository
            for (let index = 0; index < arr.length; index++) {
              summ = parseInt(summ) + parseInt(arr[index])
            }
        }

        if (this.summRepositoryOther !="" || this.summRepositoryOther != [] || this.summRepositoryOther != null) {
        let arr = this.summRepositoryOther
            for (let index = 0; index < arr.length; index++) {
              summOtherPart = parseInt(summOtherPart) + parseInt(arr[index])
            }
        }
        
        this.coastSparePart = parseInt(summ) + parseInt(summOtherPart)
        //return parseInt(summ) + parseInt(summOtherPart)
      },
      coastJobsFunc(){      
        this.coastJobsAll = parseInt(this.getJobsAll())
      },
      coastOtherPartFunc(){        
        this.coastSparePart = parseInt(this.getSummPartAll())
      },
      addEvent(summ, item){
        let n = parseInt(this.parts[item].description)
        let summEnd = parseInt(this.summ[item])   
        let plusPercent = 0

        this.summRepository[item] = summEnd * n
        if(this.parts[item].percent > 0){
                plusPercent= parseInt(this.summRepository[item]) / 100 * this.parts[item].percent
        }
        this.summRepository[item] = parseInt(this.summRepository[item]) + parseInt(plusPercent)
        this.getSummPartAll()
      },
      remove (item) {
       this.friends.splice(item, 1)
      },
      addCoastJob(){
            this.coastJobs.push({
                title: "",
                price: "",
                percent: 0,
              })
            },
      addRow() {
            this.parts.push({
                id: "",
                title: "",
                description: "",
                percent: 0,
              })
              console.log(this.parts);
            },
      removeElement(index) {
            this.parts.splice(index, 1);
            this.summRepository.splice(index, 1);
            this.getSummPartAll()
      },
      removeCoastJobs(index) {
            this.coastJobs.splice(index, 1);
            this.coastJobsFunc()
      },
      addOterRow() {
            this.otherPart.push({
                name: "",
                articale: "",
                howmuch: "",
                price: "",
                percent: 0,
              })
            },
      removeOterElement(index) {
            this.otherPart.splice(index, 1);
            this.summRepositoryOther.splice(index, 1);
            this.getSummPartAll()
      },
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      save () {
        axios({
          method: 'post',
          url: 'http://localhost:8081/updateTechnicalServiceData',
          data: {
              auto: this.editedItem.auto,
              typeJob: this.editedItem.typeJob,
              autoRun: this.editedItem.autoRun,
              listJobs: this.editedItem.listJobs,
              contragent: this.editedItem.contragent,
              statestatePassengerSeat: this.editedItem.statestatePassengerSeat,
              resultDyagnostic: this.editedItem.resultDyagnostic,
              coastSparePart: this.editedItem.coastSparePart,
              coastJobs: this.editedItem.coastJobs,
              statusRes: this.editedItem.statusRes,
              tyreBrand: this.editedItem.tyreBrand,
              bodyCabineDamage: this.editedItem.bodyCabineDamage,
              autoCleanliness: this.editedItem.autoCleanliness,
              overallInteriorCleanliness: this.editedItem.overallInteriorCleanliness,
              stateCeling: this.editedItem.stateCeling,
              statePassengerSeat: this.editedItem.statePassengerSeat,
              stateDriverSeat: this.editedItem.stateDriverSeat,
              stateSeatbelt: this.editedItem.stateSeatbelt,
              stateSteeringWheelAndSwitches: this.editedItem.stateSteeringWheelAndSwitches,
              statePanel: this.editedItem.statePanel,
              stateSwitchKPP: this.editedItem.stateSwitchKPP,
              windscreenCondition: this.editedItem.windscreenCondition,
              stateLeftwindscreen: this.editedItem.stateLeftwindscreen,
              trunkCondition: this.editedItem.trunkCondition,
              stateTyre: this.editedItem.stateTyre,
              foreginLicenceRegistration: this.editedItem.foreginLicenceRegistration,
              dateData: this.editedItem.dateData,
              _id: this.$route.params.id,
          }
        })
      },
    },
  }
</script>