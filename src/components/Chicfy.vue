<template>
<div>
  <el-container type="flex" justify="center">
    <el-col :span="8">
      <el-main>
        <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" list-type="picture" :limit="2" :on-success="fileUpload">
          <div slot="tip" class="el-upload__tip">Solo archivos jpg/png con un tamaño menor de 500kb</div>
          <el-button size="small" type="primary">Clic para subir archivo</el-button>
        </el-upload>
      </el-main>
    </el-col>

    <el-col :span="16">
      <el-container>
        <el-main>
          <el-row>
            <el-main>
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
            </el-main>
          </el-row>

          <el-row v-if="validationMethod==walideanNotAllowed">
            <el-container>
              <el-main>
                <el-form ref="form" :model="form" label-width="120px" label-position="top" size="mini">
                  <el-row type="flex" justify="start" :gutter="20">
                    <el-col :span="7">
                      <el-form-item label="Apellido 1">
                        <el-input v-model="form.name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="Apellido 2">
                        <el-input v-model="form.name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="Nombre">
                        <el-input v-model="form.name"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row type="flex" justify="start" :gutter="20">
                    <el-col :span="7">
                      <el-form-item label="Fecha de nacimiento">
                        <el-date-picker type="date" placeholder="Pick a date" v-model="form.date1" style="width: 100%;"></el-date-picker>
                      </el-form-item>
                    </el-col>

                    <el-col :span="7">
                      <el-form-item label="Nacionalidad">
                        <el-select v-model="form.region" placeholder="Selecciona tu nacionalidad">
                          <el-option label="Zone one" value="shanghai"></el-option>
                          <el-option label="Zone two" value="beijing"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                    <el-col :span="7">
                      <el-form-item label="Sexo">
                        <el-radio-group v-model="form.resource">
                          <el-radio label="Hombre"></el-radio>
                          <el-radio label="Mujer"></el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row type="flex" justify="start" :gutter="20">
                    <el-col :span="7">
                      <el-form-item label="Numero DNI">
                        <el-input v-model="form.name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="Localidad">
                        <el-input v-model="form.name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="Provincia">
                        <el-input v-model="form.name"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row type="flex" justify="start" :gutter="20">
                    <el-col :span="14">
                      <el-form-item label="Direccion">
                        <el-input v-model="form.name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="Fecha de caducidad">
                        <el-date-picker type="date" placeholder="Pick a date" v-model="form.date1" style="width: 100%;"></el-date-picker>
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
    <el-row type="flex" justify="center" :gutter="20" v-if="validationMethod">
      <el-col :span="7">
        <el-button type="primary" @click="onSubmit" :disabled="filesUploaded.length < 2">Enviar</el-button>
      </el-col>
    </el-row>
  </el-footer>



</div>

</div>
</template>

<style>
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
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      filesUploaded: [],
      validationMethod: null,
      termsAccepted: false,
      legalTerms: texts.legalTerms,
      walideanAllowed: consts.walideanAllowed,
      walideanNotAllowed: consts.walideanNotAllowed
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file, fileList);
    },
    fileUpload(response, file, fileList) {
      console.log("LA LISTA ES");
      console.log(fileList);
      this.filesUploaded = fileList;
    },
    onSubmit(form) {
      console.log(form);
    },
    setValidationMethod(method) {
      this.validationMethod = method;
      if (method == this.walideanNotAllowed)
        console.log("TermsAccepted a false");
      this.termsAccepted = false;
    }
  }
}
</script>
