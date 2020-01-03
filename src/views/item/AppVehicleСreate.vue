<template>
 <div>
      <v-toolbar flat>
        <v-toolbar-title>Добавление автомобиля</v-toolbar-title>
        
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
        <v-tab> Информация </v-tab>
        <v-tab> Регистрационные данные </v-tab>
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
            label="Марка"
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
            label="Модель"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="8"
        >
        <v-select :items="status" v-model="status" label="Владелец"></v-select>
        </v-col>
         <v-col
          cols="12"
          md="8"
        >
        <v-select :items="status" v-model="status" label="Категория"></v-select>
        </v-col>

        <v-col
          cols="12"
          md="8"
        >
          <v-text-field
            v-model="lastname"
            :rules="nameRules"
            :counter="10"
            label="Пробег"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="8">
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
                          label="Начало эксплуатации"
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

        <v-col cols="12" md="8">
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
                          label="Окончание эксплуатации"
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

        <v-col cols="12" md="8">
            <v-select :items="status" v-model="status" label="Статус"></v-select>
        </v-col>

         <v-col cols="12" md="12">
          <v-toolbar-title>ТО и Страховка</v-toolbar-title>
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Название страховой компании"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Номер страхового полиса"
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
                          label="Срок действия страхового полиса"
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
                          label="Срок окончания действия ТО"
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
            label="Пробег замены масла, км"
            required
          ></v-text-field> 
         </v-col>
    


  
         <v-col cols="12" md="12">
          <v-toolbar-title>Оборудование</v-toolbar-title>
         </v-col>
        <v-col cols="12" md="6">
            <v-select :items="status" v-model="status" label="Тип шин"></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Марка шин"
            required
          ></v-text-field> 
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Номер маяка"
            required
          ></v-text-field> 
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="IMEI маяка"
            required
          ></v-text-field> 
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Дополнительное оборудование"
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
                <v-toolbar-title>Паспорт ТС</v-toolbar-title>
          </v-col>
          <v-col cols="12" md="6">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Серия и номер ПТС"
            required
          ></v-text-field> 
        </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="VIN"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
         <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Наименование, тип ТС"
            required
          ></v-text-field> 
        </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Категория ТС"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
         <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Год выпуска"
            required
          ></v-text-field> 
        </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Модель, номер двигателя"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
         <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Шасси (рама)"
            required
          ></v-text-field> 
        </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Цвет кузова (кабины, прицепа)"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
         <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Мощность двигателя, ЛС/КВт"
            required
          ></v-text-field> 
        </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Рабочий объем двигателя, куб. см"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
         <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Тип двигателя"
            required
          ></v-text-field> 
        </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Экологический класс"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
         <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Разрешенная максимальная масса, кг"
            required
          ></v-text-field> 
        </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Масса без нагрузки, кг"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Кем выдан ПТС"
            required
          ></v-text-field> 
         </v-col>


          <v-col cols="12" md="12">
                <v-toolbar-title>Свидетельство о регистрации ТС</v-toolbar-title>
          </v-col>
          <v-col cols="12" md="6">
           <v-switch v-model="continues" class="ma-2" label="Иностранное свидетельство о регистрации"></v-switch>
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Ном. знак"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Серия и номер СТС"
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
                          label="Дата выдачи СТС"
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
      picker: new Date().toISOString(),
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