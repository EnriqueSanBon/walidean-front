<template>
<div>
  <el-container type="flex" justify="center">
    <el-col :span="8">
      <el-main>
        <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" list-type="picture" :limit="2" :on-success="fileUpload" :auto-upload="false" ref="upload" :on-progress="handleProgress">
          <el-button slot="trigger" size="small" type="primary">Clic para subir archivo</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">Cargar al servidor</el-button>
        </el-upload>
        <el-form ref="form2" :model="form" label-width="120px" label-position="top" size="mini">
          <el-form-item label="Numero DNI">
            <el-input v-model="form.numberId"></el-input>
          </el-form-item>
        </el-form>

      </el-main>
    </el-col>

    <el-col :span="16">
      <el-container>
        <el-main>
          <el-row>
            <el-row type="flex" justify="center">
              <p>
                Tus datos han de ser validados. Podemos procesar los datos nosotros usando la plataforma Walidean o si lo prefieres puedes introducirlos a mano
              </p>
            </el-row>

            <el-row type="flex" justify="center">
              <el-col :span="14">
                <el-button type="primary" @click="setValidationMethod(walideanAllowed)" plain>Usar Walidean</el-button>
                <el-button type="danger" @click="setValidationMethod(walideanNotAllowed)" plain>Itroducirlo a mano</el-button>
              </el-col>
            </el-row>
          </el-row>

          <el-row v-if="validationMethod==walideanNotAllowed">
            <el-container>
              <el-main>
                <el-form ref="form" :model="form" :rules="rules" label-width="120px" label-position="top" size="mini">
                  <el-row type="flex" justify="start" :gutter="20">
                    <el-col :span="7">
                      <el-form-item label="Apellido 1" prop="surname1">
                        <el-input v-model="form.surname1"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="Apellido 2" prop="surname2">
                        <el-input v-model="form.surname2"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="Nombre" prop="name">
                        <el-input v-model="form.name"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row type="flex" justify="start" :gutter="20">
                    <el-col :span="7">
                      <el-form-item label="Fecha de nacimiento" prop="birthDate">
                        <el-date-picker type="date" placeholder="Pick a date" v-model="form.birthDate" style="width: 100%;"></el-date-picker>
                      </el-form-item>
                    </el-col>

                    <el-col :span="7">
                      <el-form-item label="Nacionalidad" prop="nationality">
                        <el-select v-model="form.nationality" placeholder="Selecciona tu nacionalidad">
                          <el-option v-for="item in countries" :label="item" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                    <el-col :span="7">
                      <el-form-item label="Sexo" prop="gender">
                        <el-radio-group v-model="form.gender">
                          <el-radio label="Hombre"></el-radio>
                          <el-radio label="Mujer"></el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row type="flex" justify="start" :gutter="20">
                    <el-col :span="7">
                      <el-form-item label="Numero DNI" prop="numberId">
                        <el-input v-model="form.numberId"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="Localidad" prop="locality">
                        <el-input v-model="form.locality"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="Provincia" prop="province">
                        <el-select v-model="form.province" placeholder="Selecciona tu provincia">
                          <el-option v-for="item in provinces" :label="item" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row type="flex" justify="start" :gutter="20">
                    <el-col :span="14">
                      <el-form-item label="Direccion" prop="address">
                        <el-input v-model="form.address"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="Fecha de caducidad" prop="expirationDate">
                        <el-date-picker type="date" placeholder="Pick a date" v-model="form.expirationDate" style="width: 100%;"></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>

                </el-form>
              </el-main>
            </el-container>
          </el-row>

          <el-row v-if="validationMethod==walideanAllowed">
            <el-container>
              <el-main>
                <el-row justify="center" type="flex">
                  <h3>
                    Tus datos nunca serán compartidos sin tu permiso explicito
                  </h3>
                </el-row>
                <el-row justify="center" type="flex">
                  <h2>
                    Condiciones legales
                  </h2>
                </el-row>
              </el-main>
            </el-container>
          </el-row>

          <el-row justify="center" type="flex">
            <el-col :span="12" v-if="validationMethod==walideanAllowed">
              <el-row justify="center" type="flex" class="legalTerms">
                <el-container>
                  <el-main>
                    <p v-text="legalTerms">
                    </p>
                    <el-checkbox v-model="termsAccepted">He leido y acepto los terminos y condiciones</el-checkbox>
                  </el-main>
                </el-container>
              </el-row>
            </el-col>
          </el-row>

        </el-main>
      </el-container>
    </el-col>

  </el-container>
  <el-footer>
    <el-row type="flex" justify="center" v-if="validationMethod">
      <el-button type="primary" @click="onSubmit('form')" :disabled="disableButtonSend">Enviar</el-button>
      <el-button type="primary" @click="onSubmit('form')">Enviar</el-button>
      <el-button @click="resetForm('form')">Reset</el-button>
    </el-row>
  </el-footer>



</div>
</div>
</template>

<style lang="scss">
$font-stack: Helvetica, sans-serif;
body {
    font: 100% $font-stack;
}
.legalTerms {
    height: 200px;
}
</style>

<script>
import axios from 'axios';
import texts from '../texts.js';
import consts from '../consts.js';
export default {
  data() {

    return {
      form: {
        surname1: null,
        surname2: null,
        name: null,
        birthDate: null,
        nationality: null,
        gender: null,
        numberId: null,
        locality: null,
        province: null,
        address: null,
        expirationDate: null
      },
      rules: {
        surname1: [
          { required: true, message: 'Por favor introduce el primer apellido', trigger: 'blur' }
        ],
        surname2: [
          { required: true, message: 'Por favor introduce el segundo apellido', trigger: 'blur' }
        ],
        name: [
          { required: true, message: 'Por favor introduce el nombre', trigger: 'blur' }
        ],
        birthDate: [
          { type: 'date', required: true, message: 'Por favor elige una fecha', trigger: 'change' }
        ],
        nationality: [
          { required: true, message: 'Por favor elige un país', trigger: 'change' }
        ],
        gender: [
          { required: true, message: 'Por favor elige un género', trigger: 'change' }
        ],
        numberId: [
          { required: true, message: 'Por favor introduce el número de identificación', trigger: 'blur' }
        ],
        locality: [
          { required: true, message: 'Por favor introduce una localidad', trigger: 'blur' }
          //{ min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
        ],
        province: [
          { required: true, message: 'Por favor elige una provincia', trigger: 'change' }
        ],
        address: [
          { required: true, message: 'Por favor introduce una dirección', trigger: 'blur' }
        ],
        expirationDate: [
          { type: 'date', required: true, message: 'Por favor elige una fecha', trigger: 'change' }
        ]
      },
      countries: consts.countries,
      provinces: consts.provinces,
      filesUploaded: [],
      validationMethod: null,
      termsAccepted: false,
      legalTerms: texts.legalTerms,
      walideanAllowed: consts.walideanAllowed,
      walideanNotAllowed: consts.walideanNotAllowed
    }
  },
  methods: {

    resetForm(formName) {
      console.log("Lipiar formulario");
      this.$refs[formName].resetFields();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handleProgress(file, fileList) {
      console.log("PROGRESS");
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log("Preview");
      console.log(file);
    },
    fileUpload(response, file, fileList) {
      console.log("LA LISTA DE SUBIDOS ES");
      console.log(fileList);
      this.filesUploaded = fileList;
    },
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    setValidationMethod(method) {
      this.validationMethod = method;
      if (method == this.walideanNotAllowed)
        console.log("TermsAccepted a false");
      this.termsAccepted = false;
    },
    submitUpload() {
      console.log("Se va a subir archivo");
      this.$refs.upload.submit();
    }
  },
  computed: {
    disableButtonSend: function() {
      return (this.filesUploaded.length < 2 || (this.termsAccepted == false && this.validationMethod == this.walideanAllowed) || this.form.numberId.length == 0)
    }
  }
}
</script>
