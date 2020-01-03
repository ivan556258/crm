<template>
 <div>
      <v-toolbar flat>
        <v-toolbar-title>Добавление водителя</v-toolbar-title>
        
        <v-spacer></v-spacer>
        
        <v-dialog v-model="dialog" max-width="100%">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" class="mb-2 ml-1" v-on="on">{{formDriveTitle}}</v-btn>
            <v-btn color="success" class="mb-2" v-on="on">{{formAutoTitle}}</v-btn>
          </template>
          
          <v-card>
            <v-card-title>
              <span class="headline">Добавление водителя</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="4Dessert name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
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
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="8"
        >
          <v-text-field
            v-model="firstname"
            :rules="nameRules"
            :counter="10"
            label="Фамилия"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="8"
        >
          <v-text-field
            v-model="lastname"
            :rules="nameRules"
            :counter="10"
            label="Имя"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="8"
        >
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Отчество"
            required
          ></v-text-field>
           <v-select :items="status" v-model="status" label="Статус"></v-select>

        </v-col>
         <v-col cols="12" md="12">
          <v-toolbar-title>Паспортные данные, удостоверение личности</v-toolbar-title>
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Серия и номер"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
          <v-menu
                      ref="beginmenu"
                      v-model="beginmenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="begindate"
                          label="Дата рождения"
                          clearable
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        ref="picker"
                        v-model="begindate"
                        max="2050-01-01"
                        min="1950-01-01"
                      ></v-date-picker>
                  </v-menu>
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Выдан"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Код подразделения"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
          <v-menu
                      ref="beginmenu"
                      v-model="beginmenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="begindate"
                          label="Дата выдачи"
                          clearable
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        ref="picker"
                        v-model="begindate"
                        max="2050-01-01"
                        min="1950-01-01"
                      ></v-date-picker>
                  </v-menu>
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Место рождения"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Адрес регистрации"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
           <v-switch v-model="continues" class="ma-2" label="Является собственником"></v-switch>
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="СНИЛС / ИИН"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="12">
          <v-toolbar-title>Контактные данные</v-toolbar-title>
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Телефон"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Адрес фактического проживания"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Дополнительные контакты"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="12">
          <v-toolbar-title>Данные водителя</v-toolbar-title>
         </v-col>
         <v-col cols="12" md="6">
           <v-switch v-model="continues" class="ma-2" label="Иностранное водительское удостоверение"></v-switch>
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Класс страховки"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Номер ВУ"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
          <v-menu
                      ref="beginmenu"
                      v-model="beginmenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="begindate"
                          label="Дата выдачи ВУ"
                          clearable
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        ref="picker"
                        v-model="begindate"
                        max="2050-01-01"
                        min="1950-01-01"
                      ></v-date-picker>
                  </v-menu>
         </v-col>
         <v-col cols="12" md="6">
           <v-switch v-model="continues" class="ma-2" label="Имеется личный автомобиль"></v-switch>
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Марка авто и номер"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Рейтинг"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="12">
          <v-toolbar-title>Дополнительные данные</v-toolbar-title>
         </v-col>
          <v-col cols="12" md="6">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Комментарий"
            required
          ></v-text-field> 
         </v-col>
      </v-row>
    </v-container>
  </v-form>
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
           <v-switch v-model="continues" class="ma-2" label="Информировать водителя при изменении баланса счета"></v-switch>
         </v-col>
         <v-col cols="12" md="6">
           <v-switch v-model="continues" class="ma-2" label="Информировать о необходимости пополнить счет при балансе меньше нуля"></v-switch>
         </v-col>
         <v-col cols="12" md="6">
           <v-switch v-model="continues" class="ma-2" label="Информировать о новых штрафах ГИБДД"></v-switch>
         </v-col>
         <v-col cols="12" md="6">
           <v-switch v-model="continues" class="ma-2" label="Информировать о необходимости замены масла"></v-switch>
         </v-col>
          <v-col cols="12" md="12">
                <v-toolbar-title>Блокировка автомобиля</v-toolbar-title>
          </v-col>
          <v-col cols="12" md="6">
           <v-switch v-model="continues" class="ma-2" label="Разрешение блокировки"></v-switch>
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Пороговый баланс водителя"
            required
          ></v-text-field> 
         </v-col>
          <v-col cols="12" md="12">
                <v-toolbar-title>Yandex API</v-toolbar-title>
          </v-col>
          <v-col cols="12" md="6">
           <v-switch v-model="continues" class="ma-2" label="Включить автоматические списания арендной платы с диспетчерской"></v-switch>
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
  export default {
    name: 'AppVehicleId',
    data () {
      return {
        tabs: null,
        status: ["Foo", "Bar", "Fizz", "Buzz"],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
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