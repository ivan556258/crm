<template>
 <div>
      <v-toolbar flat>
        <v-toolbar-title> Добавление владельца</v-toolbar-title>
        
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
        <v-tab> Информация </v-tab>
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
            :counter="250"
            label="Название"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="8">
          <v-text-field
            v-model="phone"
            :counter="20"
            label="Телефон"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="8">
          <v-text-field
            v-model="contactPerson"
            :counter="250"
            label="Контактное лицо"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="8">
          <v-text-field
            v-model="proceedings"
            :counter="100"
            label="Реквизиты"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="8">
          <v-text-field
            v-model="groundsForContract"
            :counter="300"
            label="Основание для договора"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="8">
          <v-text-field
            v-model="additionContract"
            :counter="500"
            label="Дополнительно для договора"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="12">
                <v-toolbar-title>Условия работы</v-toolbar-title>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="percentageRevenue"
            :counter="3"
            label="% выручки"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="profitInterest"
            :counter="3"
            label="% прибыли"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="perDay"
            :counter="6"
            label="В день"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="perMounth"
            :counter="6"
            label="В месяц"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="conditionJobs"
            :counter="500"
            label="Условия работы"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
</template>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
</div>
</template>

<script>
import axios from "axios";
  export default {
    name: 'AppVehicleId',
    data () {
      return {
        tabs: null,
        status: ["Foo", "Bar", "Fizz", "Buzz"],
        dialog: false,
        name: null,
        phone: null,
        contactPerson: null,
        proceedings: null,
        groundsForContract: null,
        additionContract: null,
        percentageRevenue: null,
        profitInterest: null,
        perDay: null,
        perMounth: null,
        conditionJobs: null,
      }
    },
    computed: {
      formDriveTitle () {
        return 'Сохранить и выйти'
      },
      formAutoTitle () {
        return'Сохранить'
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
         axios({
          method: 'post',
          url: 'http://localhost:8081/insertOwnerData',
          data: {
              name: this.name,
              phone: this.phone,
              contactPerson: this.contactPerson,
              proceedings: this.proceedings,
              groundsForContract: this.groundsForContract,
              additionContract: this.additionContract,
              percentageRevenue: this.percentageRevenue,
              profitInterest: this.profitInterest,
              perDay: this.perDay,
              perMounth: this.perMounth,
              conditionJobs: this.conditionJobs,
          }
         })
        }
        this.close()
      },
    },
  }
</script>