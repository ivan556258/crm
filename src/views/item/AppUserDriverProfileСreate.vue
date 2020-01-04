<template>
 <div>
      <v-toolbar flat>
        <v-toolbar-title>Добавление водителя</v-toolbar-title>
        
        <v-spacer></v-spacer>
        
        <v-dialog v-model="dialog" max-width="100%">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" class="mb-2 ml-1" >{{formDriveTitle}}</v-btn>
            <v-btn color="success" class="mb-2" @click="save()" >{{formAutoTitle}}</v-btn>
          </template>
        </v-dialog>    
    </v-toolbar>

<template>
  <v-card>
    <v-toolbar>
      <v-tabs
        slot="extension"
        v-model="tabs"
        background-color="transparent"
      >
        <v-tab> Профиль водителя </v-tab>
        <v-tab> Настройки </v-tab>
      </v-tabs>
    </v-toolbar>

    <v-tabs-items v-model="tabs">
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <template>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="8"
        >
          <v-text-field
            v-model="lastname"
            :counter="150"
            label="Фамилия"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="8"
        >
          <v-text-field
            v-model="firstname"
            :counter="150"
            label="Имя"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="8">
          <v-text-field
            v-model="fathername"
            :counter="150"
            label="Отчество"
            required
          ></v-text-field>
          </v-col>
          <v-col cols="12" md="8">
           <v-select :items="status" v-model="status" label="Статус"></v-select>
          </v-col>
         <v-col cols="12" md="12">
          <v-toolbar-title>Паспортные данные, удостоверение личности</v-toolbar-title>
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="seriaAndNumberPassport"
            :counter="10"
            label="Серия и номер"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
          <v-menu
                      ref="brithdaymenu"
                      v-model="brithdaymenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="brithday"
                          label="Дата рождения"
                          clearable
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        ref="brithdaypicker"
                        v-model="brithday"
                        max="2050-01-01"
                        min="1950-01-01"
                      ></v-date-picker>
                  </v-menu>
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="issued"
            :counter="200"
            label="Выдан"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="codePollicia"
            :counter="14"
            label="Код подразделения"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
          <v-menu
                      ref="dateIssuedMenu"
                      v-model="dateIssuedMenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="dateIssuedDate"
                          label="Дата выдачи"
                          clearable
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        ref="dateIssuedPicker"
                        v-model="dateIssuedDate"
                        max="2050-01-01"
                        min="1950-01-01"
                      ></v-date-picker>
                  </v-menu>
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="locationBrithday"
            :counter="125"
            label="Место рождения"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="addressRegistration"
            :counter="125"
            label="Адрес регистрации"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
           <v-switch v-model="isOwner" class="ma-2" label="Является собственником"></v-switch>
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="inn"
            :counter="25"
            label="СНИЛС / ИИН"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="12">
          <v-toolbar-title>Контактные данные</v-toolbar-title>
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="phone"
            :counter="25"
            label="Телефон"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="email"
            :counter="25"
            label="E-mail"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="addressInLifes"
            :counter="250"
            label="Адрес фактического проживания"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="moreContacts"
            :counter="500"
            label="Дополнительные контакты"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="12">
          <v-toolbar-title>Данные водителя</v-toolbar-title>
         </v-col>
         <v-col cols="12" md="6">
           <v-switch v-model="foreginDriversLicence" class="ma-2" label="Иностранное водительское удостоверение"></v-switch>
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="classInsurance"
            :counter="50"
            label="Класс страховки"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="numberDriverLicence"
            :counter="50"
            label="Номер ВУ"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
          <v-menu
                      ref="dateIssuedDriverLicenceMenu"
                      v-model="dateIssuedDriverLicenceMenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="dateIssuedDriverLicenceDate"
                          label="Дата выдачи ВУ"
                          clearable
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        ref="dateIssuedDriverLicencePicker"
                        v-model="dateIssuedDriverLicenceDate"
                        max="2050-01-01"
                        min="1950-01-01"
                      ></v-date-picker>
                  </v-menu>
         </v-col>
         <v-col cols="12" md="6">
           <v-switch v-model="isSelfCar" class="ma-2" label="Имеется личный автомобиль"></v-switch>
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="carBrandAndNumber"
            :counter="100"
            label="Марка авто и номер"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="rating"
            :counter="50"
            label="Рейтинг"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="12">
          <v-toolbar-title>Дополнительные данные</v-toolbar-title>
         </v-col>
          <v-col cols="12" md="6">
          <v-text-field
            v-model="commentaries"
            :counter="450"
            label="Комментарий"
            required
          ></v-text-field> 
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
          <v-col cols="12" md="12">
                <v-toolbar-title>SMS</v-toolbar-title>
          </v-col>
          <v-col cols="12" md="6">
           <v-switch v-model="informDriverBalanceChanges" class="ma-2" label="Информировать водителя при изменении баланса счета"></v-switch>
         </v-col>
         <v-col cols="12" md="6">
           <v-switch v-model="informDriverBalanceLittle" class="ma-2" label="Информировать о необходимости пополнить счет при балансе меньше нуля"></v-switch>
         </v-col>
         <v-col cols="12" md="6">
           <v-switch v-model="informDriverNewPenalty" class="ma-2" label="Информировать о новых штрафах ГИБДД"></v-switch>
         </v-col>
         <v-col cols="12" md="6">
           <v-switch v-model="informDriverOilChange" class="ma-2" label="Информировать о необходимости замены масла"></v-switch>
         </v-col>
          <v-col cols="12" md="12">
                <v-toolbar-title>Блокировка автомобиля</v-toolbar-title>
          </v-col>
          <v-col cols="12" md="6">
           <v-switch v-model="allowedBlocked" class="ma-2" label="Разрешение блокировки"></v-switch>
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="thresholdBalanceForDriver"
            :counter="6"
            label="Пороговый баланс водителя"
            required
          ></v-text-field> 
         </v-col>
          <v-col cols="12" md="12">
                <v-toolbar-title>Yandex API</v-toolbar-title>
          </v-col>
          <v-col cols="12" md="6">
           <v-switch v-model="onAutomaticRentMoney" class="ma-2" label="Включить автоматические списания арендной платы с диспетчерской"></v-switch>
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
        lastname: null,
        firstname: null,
        fathername: null,
        seriaAndNumberPassport: null,
        locationBrithday: null,
        addressRegistration: null,
        isOwner: false,
        phone: null,
        email: null,
        inn: null,
        classInsurance: null,
        numberDriverLicence: null,
        dateIssuedDriverLicenceMenu: null,
        dateIssuedDriverLicenceDate: null,
        addressInLifes: null,
        moreContacts: null,
        foreginDriversLicence: false,
        isSelfCar: false,
        carBrandAndNumber: null,
        rating: null,
        commentaries: null,
        brithdaymenu: null,
        informDriverBalanceChanges: false,
        informDriverBalanceLittle: false,
        informDriverNewPenalty: false,
        informDriverOilChange: false,
        allowedBlocked: false,
        onAutomaticRentMoney: false,
        thresholdBalanceForDriver: null,
        dateIssuedMenu: null,
        dateIssuedDate: null,
        brithday: null,
        issued: null,
        codePollicia: null,
        brithdaypicker: new Date().toISOString(),
        dateIssuedPicker: new Date().toISOString(),
        dateIssuedDriverLicencePicker: new Date().toISOString(),
        status: [
          "активный", 
          "заблокированный", 
          "проверенный", 
          "удалённый", 
          "неактивный", 
          "предрегистрация", 
          "предрегистрация", 
          "предрегистрация",
          "непроверенный",
          "передан на взыскание"
          ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        dialog: false,
      editedIndex: -1,
      picker: new Date().toISOString(),
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
        this.desserts = [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
          },
        ]
      },
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      save () {
        /* if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close() */
        console.log(this.lastname);
        console.log(this.informDriverBalanceChanges);
        
          axios({
          method: 'post',
          url: 'http://localhost:8081/insertContractData',
          data: {
            number: this.number,
            driver: this.driver,
            auto: this.autos,
            tariff: this.tariff,
            begindate: this.begindate,
            enddate: this.enddate,
            continues: this.continues,
            moreInfo: this.moreInfo,
            status: this.status
          }
        })
      .then(function(){
        console.log('SUCCESS!!')
      })
      .catch(function(){
        console.log('FAILURE!!')
      })
      },
    },
  }
</script>