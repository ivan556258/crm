<template>
 <div>
      <v-toolbar flat>
        <v-toolbar-title>Панель управления</v-toolbar-title>
        
        <v-spacer></v-spacer>
        
        <v-dialog v-model="dialog" max-width="100%">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" class="mb-2 ml-1" v-on="on">{{formDriveTitle}}</v-btn>
            <v-btn color="success" class="mb-2" v-on="on">{{formAutoTitle}}</v-btn>
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
            v-model="name"
            :counter="10"
            label="Название"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="8">
          <v-text-field
            v-model="city"
            :counter="10"
            label="Город"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="8">
          <v-text-field
            v-model="address"
            :counter="250"
            label="Адрес"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="8">
          <v-text-field
            v-model="email"
            label="E-mail"
            :counter="250"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="8">
          <v-text-field
            v-model="phone"
            :counter="16"
            label="Телефон"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="8">
          <v-text-field
            v-model="phoneSTO"
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
                    <v-switch v-model="onTurnSMS" class="ma-2" label="Включить SMS оповещения в автопрокате"></v-switch>
            </v-col>
            <v-col cols="12" md="8">
                    <v-switch v-model="sendHello" class="ma-2" label="Отправлять приветствие при создании договора"></v-switch>
            </v-col>
            <v-col cols="12" md="8">
            <v-text-field
                v-model="templeteSMSOne"
                :counter="300"
                label="Шаблон SMS"
                required
            ></v-text-field>
            </v-col>
            <v-col cols="12" md="8">
                    <v-switch v-model="informAboutAddScore" class="ma-2" label="Информировать о необходимости пополнить счет при балансе меньше нуля"></v-switch>
            </v-col>
            <v-col cols="12" md="8">
            <v-text-field
                v-model="templeteSMSTwo"
                :counter="300"
                label="Шаблон SMS"
                required
            ></v-text-field>
            </v-col>
            <v-col cols="12" md="8">
                    <v-switch v-model="informNewPenalty" class="ma-2" label="Информировать о новых штрафах ГИБДД"></v-switch>
            </v-col>
            <v-col cols="12" md="8">
            <v-text-field
                v-model="templeteSMSThree"
                :counter="300"
                label="Шаблон SMS"
                required
            ></v-text-field>
            </v-col>
            <v-col cols="12" md="8">
                    <v-switch v-model="informNeedChangeOli" class="ma-2" label="Информировать о необходимости замены масла"></v-switch>
            </v-col>
            <v-col cols="12" md="8">
            <v-text-field
                v-model="templeteSMSFoo"
                :counter="300"
                label="Шаблон SMS"
                required
            ></v-text-field>
            </v-col>
            <v-col cols="12" md="8">
            <v-text-field
                v-model="templeteSMSFive"
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
            v-model="APIYandexKey"
            :counter="50"
            label="API ключ Яндекс Такси"
            required
          ></v-text-field>
        </v-col>
         <v-col cols="12" md="8">
          <v-text-field
            v-model="idPark"
            :counter="16"
            label="ID парка"
            required
          ></v-text-field>
        </v-col>
         <v-col cols="12" md="8">
          <v-text-field
            v-model="idClient"
            :counter="16"
            label="ID клиента"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="8">
             <v-select :items="status" v-model="scoreYandexAPI" label="Счет для Яндекс API"></v-select>
        </v-col>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
             <vue-editor :editorToolbar="customToolbar" v-model="contractTrack"></vue-editor>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
               <vue-editor v-model="autoReturn"></vue-editor>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
               <vue-editor v-model="congratulations"></vue-editor>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
              <v-col cols="12" md="8">
                    <v-switch v-model="globAllowedBlockAuto" class="ma-2" label="Глобальное разрешение блокировки автомобилей"></v-switch>
            </v-col>
            <v-col cols="12" md="8">
            <v-text-field
                v-model="smsDriverBlock"
                :counter="16"
                label="Текст sms уведомления водителя о блокировке"
                required
            ></v-text-field>
            </v-col>
            <v-col cols="12" md="8">
            <v-text-field
                v-model="smsDriverUnblock"
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
  export default {
    components: {
        VueEditor
    },
    name: 'AppUserCompany',
    data () {
      return {
        tabs: null,
        contractTrack: '',
        autoReturn: '',
        customToolbar: [["bold", "italic", "underline"], [{ list: "ordered" }, { list: "bullet" }], ["image", "code-block"]],
        congratulations: '',
        APIYandexKey: '',
        globAllowedBlockAuto: '',
        smsDriverBlock: '',
        smsDriverUnblock: '',
        idPark: '',
        status: ["Foo", "Bar", "Fizz", "Buzz"],
        idClient: '',
        scoreYandexAPI: '',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        name: '',
        city: '',
        address: '',
        email: '',
        phone: '',
        phoneSTO: '',
        onTurnSMS: '',
        sendHello: '',
        templeteSMSOne: '',
        informAboutAddScore: '',
        templeteSMSTwo: '',
        informNewPenalty: '',
        templeteSMSThree: '',
        informNeedChangeOli: '',
        templeteSMSFoo: '',
        templeteSMSFive: '',
        dialog: false,
      editedIndex: -1,
      picker: new Date().toISOString().substr(0, 10),
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
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
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>
<style>
.ql-tooltip.ql-editing {
    left: 0!important;
}
</style>