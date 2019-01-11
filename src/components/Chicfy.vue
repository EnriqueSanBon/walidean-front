<template>
<div>
  <el-container type="flex" justify="center">
    <el-col :span="8">
      <el-main>
        <span class="instructions">Instrucciones</span>
        <el-row type="flex" justify="center" :gutter="20">
          <el-col :span="12">
            <el-popover placement="top-start" title="Calidad" width="200" trigger="hover" content="La imagen debe verse clara y nitida">
              <img slot="reference" src="../assets/requisitosFoto/borrosa.png">
            </el-popover>
          </el-col>
          <el-col :span="12">
            <el-popover placement="top-start" title="Información" width="200" trigger="hover" content="Deben leerse correctamente todos los campos, no debe haber reflejos ni campos tachados u ocultos">
              <img slot="reference" src="../assets/requisitosFoto/Informacion.png">
            </el-popover>
          </el-col>
          <el-col :span="12">
            <el-popover placement="top-start" title="Fondo" width="200" trigger="hover" content="La foto debe hacerse sobre un fondo oscuro">
              <img slot="reference" src="../assets/requisitosFoto/fondo.png">
            </el-popover>
          </el-col>
          <el-col :span="12">
            <el-popover placement="top-start" title="Marcos" width="200" trigger="hover" content="Asegurate de que se ven las 4 esquinas del documento">
              <img slot="reference" src="../assets/requisitosFoto/marcos.png">
            </el-popover>
          </el-col>
        </el-row>

        <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" list-type="picture" :limit="2" :on-success="fileUpload" :auto-upload="false" ref="upload" :on-progress="handleProgress">
          <el-button slot="trigger" size="small" type="primary">Clic para subir archivo</el-button>
          <!--<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">Cargar al servidor</el-button>-->
        </el-upload>


        <el-form ref="form2" :model="form" :rules="rules" label-width="120px" label-position="top" size="mini">
          <el-form-item label="Numero DNI" prop="numberId">
            <el-input v-model="form.numberId"></el-input>
          </el-form-item>
          <el-form-item label="Email" prop="email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
        </el-form>
      </el-main>
    </el-col>

    <el-col :span="16">
      <el-container>
        <el-main>
          <el-row>

            <el-row type="flex" justify="center">
              <span class="title">WALIDEAN</span>
            </el-row>
            <el-row type="flex" justify="center">
              <p>
                Tus datos han de ser validados. Podemos procesar los datos nosotros usando la plataforma Walidean o si lo prefieres puedes introducirlos a mano. ¿Que método prefieres utilizar?
              </p>
            </el-row>

            <el-row type="flex" justify="center">
              <el-button type="primary" @click="setValidationMethod(walideanAllowed)" plain>Usar Walidean</el-button>
              <el-button type="danger" @click="setValidationMethod(walideanNotAllowed)" plain>Itroducirlo a mano</el-button>
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
                    <el-col :span="7">
                      <el-form-item label="Direccion" prop="address">
                        <el-input v-model="form.address"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="Fecha de caducidad" prop="expirationDate">
                        <el-date-picker type="date" placeholder="Pick a date" v-model="form.expirationDate" style="width: 100%;"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="Email" prop="email">
                        <el-input v-model="form.email"></el-input>
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
    <el-row type="flex" justify="center">
      <el-button type="primary" v-if="validationMethod==walideanNotAllowed" @click="onSubmit('form')" :disabled="disableButtonSend">Enviar</el-button>
      <el-button type="primary" v-if="validationMethod==walideanAllowed" @click="onSubmit('form2')" :disabled="disableButtonSend">Enviar</el-button>
      <el-button v-if="validationMethod==walideanNotAllowed" @click="resetForm('form')">Reset</el-button>
      <el-button v-if="validationMethod==walideanAllowed" @click="resetForm('form2')">Reset</el-button>
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
.title {
    font-size: 80px;
}
.instructions {
    font-size: 30px;
}
img {
    max-width: 100%;
    max-height: 100%;
}
</style>

<script>
import axios from 'axios';
import texts from '../texts.js';
import consts from '../consts.js';
import firebase from 'firebase';
export default {
  data() {
    var checkDNI = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Por favor introduce un DNI'));
      }
      setTimeout(() => {
        if (value.length < 3 || value.length > 9) {
          callback(new Error('Numero de caracteres invalido'));
          console.log("Numero de caracteres invalido");
        }
        var letter = value.slice(-1);
        var number = value.slice(0, -1);
        console.log("Valor de la letra " + letter);
        console.log("Valor del DNI " + number);
        if (isNaN(number)) {
          callback(new Error('Introduce el número de DNI y la letra'));
        } else {
          if (!isNaN(letter)) {
            callback(new Error('Falta la letra final del DNI'));
          } else {
            if (this.controlDigits[parseInt(number) % 23] != letter) {
              callback(new Error('DNI incorrecto'));
            } else {
              callback();
            }
          }

        }
      }, 1000);
    };

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
        expirationDate: null,
        email: null
      },
      rules: {
        surname1: [{
          required: true,
          message: 'Por favor introduce el primer apellido',
          trigger: 'blur'
        }],
        surname2: [{
          required: true,
          message: 'Por favor introduce el segundo apellido',
          trigger: 'blur'
        }],
        name: [{
          required: true,
          message: 'Por favor introduce el nombre',
          trigger: 'blur'
        }],
        birthDate: [{
          type: 'date',
          required: true,
          message: 'Por favor elige una fecha',
          trigger: 'change'
        }],
        nationality: [{
          required: true,
          message: 'Por favor elige un país',
          trigger: 'change'
        }],
        gender: [{
          required: true,
          message: 'Por favor elige un género',
          trigger: 'change'
        }],
        numberId: [{
          validator: checkDNI,
          trigger: 'change'
        }],
        locality: [{
            required: true,
            message: 'Por favor introduce una localidad',
            trigger: 'blur'
          }
          //{ min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
        ],
        province: [{
          required: true,
          message: 'Por favor elige una provincia',
          trigger: 'change'
        }],
        address: [{
          required: true,
          message: 'Por favor introduce una dirección',
          trigger: 'blur'
        }],
        expirationDate: [{
          type: 'date',
          required: true,
          message: 'Por favor elige una fecha',
          trigger: 'change'
        }],
        email: [{
          type: 'email',
          required: true,
          message: 'Por favor introduce un email valido',
          trigger: 'change'
        }]
      },
      countries: consts.countries,
      provinces: consts.provinces,
      filesUploaded: [],
      validationMethod: null,
      termsAccepted: false,
      legalTerms: texts.legalTerms,
      walideanAllowed: consts.walideanAllowed,
      walideanNotAllowed: consts.walideanNotAllowed,
      db: firebase.database(),
      isMounted: false,
      controlDigits: ["T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X", "B", "N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E"]
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
          var ref = this.db.ref("/users");
          form = this.form;
          //var openSendDataAlert = this.openSendDataAlert();
          var context = this;
          /*
                    ref.orderByChild("email").equalTo(this.form.email).once("value", function(snapshot) {
                      console.log("Email encontrado");
                      console.log(snapshot.val());
                      return
                    });
          */
          ref.orderByChild("numberId").equalTo(this.form.numberId).once("value")
            .then(
              function(snapshot) {
                console.log("Resultado busqueda DNI");
                console.log(snapshot.val());
                if (snapshot.val() == null) {
                  ref.orderByChild("email").equalTo(form.email).once("value")
                    .then(function(snapshot) {
                      if (snapshot.val() == null) {
                        console.log("Abriendo dialogo, usuario no existente");
                        context.openSendDataAlert(false, null, form);
                      } else {
                        console.log("Email ya existe");
                        context.$message({
                          type: 'error',
                          message: 'El Email introducido ya existe'
                        });
                      }
                    });

                } else {
                  console.log("DNI ya existente");
                  ref.orderByChild("email").equalTo(form.email).once("value") //buscamos email
                    .then(function(snapshot) {
                      if (snapshot.val() == null) { //no existe email
                        context.$message({
                          type: 'error',
                          message: 'DNI no concuerda con Email introducido'
                        });
                      } else { //existe email
                        console.log("Email y DNI existentes, comprobando intentos y estado");
                        snapshot.forEach(function(userSnapshot) {
                          console.log(userSnapshot.key);
                          console.log(userSnapshot.val().intents);
                          console.log(userSnapshot.val().validated);
                          if (userSnapshot.val().validated == true) {
                            context.$message({
                              type: 'success',
                              message: 'Usuario ya validado'
                            });
                          } else {
                            if (userSnapshot.val().intents >= 3) {
                              context.$message({
                                type: 'error',
                                message: 'Numero de intentos excedido, tendras que esperar unos dias a que lo validemos a mano'
                              });
                            } else {
                              //llamar a iddiligence
                              console.log("Abriendo dialogo, usuario ya existente, sin validar y con intentos validos");
                              context.openSendDataAlert(true, userSnapshot, form);
                            }
                          }
                        });
                      }
                    });
                }
              });
        } else {
          console.log('error submit!!');
          context.$message({
            type: 'error',
            message: 'Error al enviar'
          });
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
    openSendDataAlert(userExists, userSnapshot, form) {
      var ref = this.db.ref("/users");
      var db = this.db;
      form = this.form;
      var uploadedFiles = this.$refs.upload.uploadFiles
      console.log("Abrir dialogo");
      this.$confirm('Vas a subir tus datos, seguro que son correctos?', 'Warning', {
        confirmButtonText: 'SI!',
        cancelButtonText: 'Cancelar',
        type: 'warning'
      }).then(() => {
        if (true) {
          console.log("Iddiligence responde OK");
          if (userExists == false) {
            db.ref('/users')
              .push({
                numberId: form.numberId,
                email: form.email,
                validated: false,
                intents: 1
              })
            var intents = 1
            console.log("Usuario añadido");
          } else {
            db.ref('/users/' + userSnapshot.key)
              .update({
                intents: userSnapshot.val().intents + 1
              })
            var intents = userSnapshot.val().intents
          }
          console.log("Se va a subir archivo");
          console.log(uploadedFiles);
          uploadedFiles.forEach(function(element, index) {
            console.log("Variable del tipo:");
            console.log(typeof(element));
            console.log(element);
            console.log(typeof(element.raw));
            console.log(element.raw);
            var file = element.raw // use the Blob or File API
            var storageRef = firebase.storage().ref();
            var mountainsRef = storageRef.child('users/' + form.numberId + '/' + intents + '/' + (index == 0 ? 'frontal' : 'trasera') + '.jpg');
            mountainsRef.put(file).then(function(snapshot) {
              console.log('Uploaded a blob or file!');
            });
          });
          this.$message({
            type: 'success',
            message: 'Autenticación realizada con exito!'
          });
          this.$router.push('/chicfy/done', () => console.log('Ruta cambiada')); // Home
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Identificación cancelada'
        });
      });
    },
    callIddiligence() {
      console.log("Iddiligence responde OK");
      return true;
    }
  },
  computed: {
    disableButtonSend: function() {
      if (!this.isMounted)
        return;
      return ((this.termsAccepted == false && this.validationMethod == this.walideanAllowed) || this.$refs.upload.uploadFiles.length < 2);
    }
  },
  mounted() {
    this.isMounted = true;
    //Iddiligence llamar a login
  }
}
</script>
