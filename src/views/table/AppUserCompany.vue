<template>
 <div>
      <v-toolbar flat>
        <v-toolbar-title>Панель управления</v-toolbar-title>
        
        <v-spacer></v-spacer>
        
        <v-dialog v-model="dialog" max-width="100%">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" class="mb-2 ml-1" @click="save()">{{formDriveTitle}}</v-btn>
            <v-btn color="success" class="mb-2" @click="save()">{{formAutoTitle}}</v-btn>
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
        <v-tab> Компания </v-tab>
        <v-tab> SMS </v-tab>
        <v-tab> Яндекс.Такси </v-tab>
        <v-tab> Договор проката </v-tab>
        <v-tab> Акт возврата автомобиля </v-tab>
        <v-tab> Обжалование </v-tab>
        <v-tab> Автопарк </v-tab>
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
          <v-text-field
            v-model="editedItem.name"
            :counter="10"
            label="Название"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="8">
          <v-text-field
            v-model="editedItem.city"
            :counter="10"
            label="Город"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="8">
          <v-text-field
            v-model="editedItem.address"
            :counter="250"
            label="Адрес"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="8">
          <v-text-field
            v-model="editedItem.email"
            label="E-mail"
            :counter="250"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="8">
          <v-text-field
            v-model="editedItem.phone"
            :counter="16"
            label="Телефон"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="8">
          <v-text-field
            v-model="editedItem.phoneSTO"
            :counter="16"
            label="Телефон СТО"
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
            <v-col cols="12" md="8">
                    <v-switch v-model="editedItem.onTurnSMS" class="ma-2" label="Включить SMS оповещения в автопрокате"></v-switch>
            </v-col>
            <v-col cols="12" md="8">
                    <v-switch v-model="editedItem.sendHello" class="ma-2" label="Отправлять приветствие при создании договора"></v-switch>
            </v-col>
            <v-col cols="12" md="8">
            <v-text-field
                v-model="editedItem.templeteSMSOne"
                :counter="300"
                label="Шаблон SMS"
                required
            ></v-text-field>
            </v-col>
            <v-col cols="12" md="8">
                    <v-switch v-model="editedItem.informAboutAddScore" class="ma-2" label="Информировать о необходимости пополнить счет при балансе меньше нуля"></v-switch>
            </v-col>
            <v-col cols="12" md="8">
            <v-text-field
                v-model="editedItem.templeteSMSTwo"
                :counter="300"
                label="Шаблон SMS"
                required
            ></v-text-field>
            </v-col>
            <v-col cols="12" md="8">
                    <v-switch v-model="editedItem.informNewPenalty" class="ma-2" label="Информировать о новых штрафах ГИБДД"></v-switch>
            </v-col>
            <v-col cols="12" md="8">
            <v-text-field
                v-model="editedItem.templeteSMSThree"
                :counter="300"
                label="Шаблон SMS"
                required
            ></v-text-field>
            </v-col>
            <v-col cols="12" md="8">
                    <v-switch v-model="editedItem.informNeedChangeOli" class="ma-2" label="Информировать о необходимости замены масла"></v-switch>
            </v-col>
            <v-col cols="12" md="8">
            <v-text-field
                v-model="editedItem.templeteSMSFoo"
                :counter="300"
                label="Шаблон SMS"
                required
            ></v-text-field>
            </v-col>
            <v-col cols="12" md="8">
            <v-text-field
                v-model="editedItem.templeteSMSFive"
                :counter="300"
                label="Шаблон восстановления пароля"
                required
            ></v-text-field>
            </v-col>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
        <v-col cols="12" md="8">
          <v-text-field
            v-model="editedItem.APIYandexKey"
            :counter="50"
            label="API ключ Яндекс Такси"
            required
          ></v-text-field>
        </v-col>
         <v-col cols="12" md="8">
          <v-text-field
            v-model="editedItem.idPark"
            :counter="16"
            label="ID парка"
            required
          ></v-text-field>
        </v-col>
         <v-col cols="12" md="8">
          <v-text-field
            v-model="editedItem.idClient"
            :counter="16"
            label="ID клиента"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="8">
             <v-select :items="status" v-model="editedItem.scoreYandexAPI" label="Счет для Яндекс API"></v-select>
        </v-col>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
             <vue-editor :editorToolbar="customToolbar" v-model="editedItem.contractTrack"></vue-editor>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
               <vue-editor v-model="editedItem.autoReturn"></vue-editor>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
               <vue-editor v-model="editedItem.congratulations"></vue-editor>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
              <v-col cols="12" md="8">
                    <v-switch v-model="editedItem.globAllowedBlockAuto" class="ma-2" label="Глобальное разрешение блокировки автомобилей"></v-switch>
            </v-col>
            <v-col cols="12" md="8">
            <v-text-field
                v-model="editedItem.smsDriverBlock"
                :counter="16"
                label="Текст sms уведомления водителя о блокировке"
                required
            ></v-text-field>
            </v-col>
            <v-col cols="12" md="8">
            <v-text-field
                v-model="editedItem.smsDriverUnblock"
                :counter="16"
                label="Текст sms уведомления водителя о разблокировке"
                required
            ></v-text-field>
            </v-col>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
</div>
</template>

<script>
import { VueEditor }  from "vue2-editor";
import axios from "axios";
  export default {
    components: {
        VueEditor
    },
    name: 'AppUserCompany',
    data () {
      return {
      dialog: false,
      tabs: null,
      status: ["Foo", "Bar", "Fizz", "Buzz"],
      customToolbar: [["bold", "italic", "underline"], [{ list: "ordered" }, { list: "bullet" }], ["image", "code-block"]],
      editedIndex: -1,
      picker: new Date().toISOString().substr(0, 10),
      editedItem: {
        contractTrack: '',
        autoReturn: '',
        customToolbar: '',
        congratulations: '',
        APIYandexKey: '',
        globAllowedBlockAuto: false,
        smsDriverBlock: '',
        smsDriverUnblock: '',
        idPark: '',
        idClient: '',
        scoreYandexAPI: '',
        name: '',
        city: '',
        address: '',
        email: '',
        phone: '',
        phoneSTO: '',
        onTurnSMS: false,
        sendHello: false,
        templeteSMSOne: '',
        informAboutAddScore: false,
        templeteSMSTwo: '',
        informNewPenalty: false,
        templeteSMSThree: '',
        informNeedChangeOli: false,
        templeteSMSFoo: '',
        templeteSMSFive: '',
      },
      defaultItem: {
        contractTrack: '',
        autoReturn: '',
        customToolbar: '',
        congratulations: '',
        APIYandexKey: '',
        globAllowedBlockAuto: false,
        smsDriverBlock: '',
        smsDriverUnblock: '',
        idPark: '',
        idClient: '',
        scoreYandexAPI: '',
        name: '',
        city: '',
        address: '',
        email: '',
        phone: '',
        phoneSTO: '',
        onTurnSMS: false,
        sendHello: false,
        templeteSMSOne: '',
        informAboutAddScore: false,
        templeteSMSTwo: '',
        informNewPenalty: false,
        templeteSMSThree: '',
        informNeedChangeOli: false,
        templeteSMSFoo: '',
        templeteSMSFive: '',
      },
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
            url:"http://localhost:8081/selectUserCompanyData"
          })
          .then(response => {
            this.editedItem = response.data
          })
          .catch(error => {
            console.log(error)
          })
      },
      save () {
        if (this.editedIndex > -1) {
          axios({
            method: "post",
            url:"http://localhost:8081/insertUserCompanyData",
            data: {
                name: this.editedItem.name,
                contractTrack: this.editedItem.contractTrack,
                autoReturn: this.editedItem.autoReturn,
                customToolbar: this.editedItem.customToolbar,
                congratulations: this.editedItem.congratulations,
                APIYandexKey: this.editedItem.APIYandexKey,
                globAllowedBlockAuto: this.editedItem.globAllowedBlockAuto,
                smsDriverBlock: this.editedItem.smsDriverBlock,
                smsDriverUnblock: this.editedItem.smsDriverUnblock,
                idPark: this.editedItem.idPark,
                idClient: this.editedItem.idClient,
                scoreYandexAPI: this.editedItem.scoreYandexAPI,
                city: this.editedItem.city,
                address: this.editedItem.address,
                email: this.editedItem.email,
                phone: this.editedItem.phone,
                phoneSTO: this.editedItem.phoneSTO,
                onTurnSMS: this.editedItem.onTurnSMS,
                sendHello: this.editedItem.sendHello,
                templeteSMSOne: this.editedItem.templeteSMSOne,
                informAboutAddScore: this.editedItem.informAboutAddScore,
                templeteSMSTwo: this.editedItem.templeteSMSTwo,
                informNewPenalty: this.editedItem.informNewPenalty,
                templeteSMSThree: this.editedItem.templeteSMSThree,
                informNeedChangeOli: this.editedItem.informNeedChangeOli,
                templeteSMSFoo: this.editedItem.templeteSMSFoo,
                templeteSMSFive: this.editedItem.templeteSMSFive,
                _id: this.editedItem._id
            }
          })
        } else {
          axios({
            method: "post",
            url:"http://localhost:8081/saveUserCompanyData",
            data: {
                name: this.editedItem.name,
                contractTrack: this.editedItem.contractTrack,
                autoReturn: this.editedItem.autoReturn,
                customToolbar: this.editedItem.customToolbar,
                congratulations: this.editedItem.congratulations,
                APIYandexKey: this.editedItem.APIYandexKey,
                globAllowedBlockAuto: this.editedItem.globAllowedBlockAuto,
                smsDriverBlock: this.editedItem.smsDriverBlock,
                smsDriverUnblock: this.editedItem.smsDriverUnblock,
                idPark: this.editedItem.idPark,
                idClient: this.editedItem.idClient,
                scoreYandexAPI: this.editedItem.scoreYandexAPI,
                city: this.editedItem.city,
                address: this.editedItem.address,
                email: this.editedItem.email,
                phone: this.editedItem.phone,
                phoneSTO: this.editedItem.phoneSTO,
                onTurnSMS: this.editedItem.onTurnSMS,
                sendHello: this.editedItem.sendHello,
                templeteSMSOne: this.editedItem.templeteSMSOne,
                informAboutAddScore: this.editedItem.informAboutAddScore,
                templeteSMSTwo: this.editedItem.templeteSMSTwo,
                informNewPenalty: this.editedItem.informNewPenalty,
                templeteSMSThree: this.editedItem.templeteSMSThree,
                informNeedChangeOli: this.editedItem.informNeedChangeOli,
                templeteSMSFoo: this.editedItem.templeteSMSFoo,
                templeteSMSFive: this.editedItem.templeteSMSFive,
                _id: this.editedItem._id
            }
          })
        }
      },
    },
  }
</script>
<style>
.ql-tooltip.ql-editing {
    left: 0!important;
}
</style>