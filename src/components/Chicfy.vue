<template>
<div>
  <el-col :sm="24" :md="8">
    <el-main>
      <el-col :span="24">
        <div>Instrucciones</div>
      </el-col>
      <el-col :xs="12" :md="6" v-for="item in instructions">
        <el-popover placement="top-start" :title="item.tittle" trigger="hover" :content="item.text">
          <img slot="reference" style="width:100%;" :src="item.src">
        </el-popover>
      </el-col>

      <el-col :sm="24" :md="24">
        <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" list-type="picture" :limit="2" :on-success="fileUpload" :auto-upload="false" ref="upload" :on-progress="handleProgress">
          <el-button slot="trigger" type="primary">Clic para subir archivo</el-button>
          <!--<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">Cargar al servidor</el-button>-->
        </el-upload>
      </el-col>

      <el-col :sm="24" :md="24">
        <el-form ref="form2" :model="form" :rules="rules" label-width="10px" label-position="top" size="">
          <el-form-item label="Numero DNI" prop="numberId">
            <el-input v-model="form.numberId" :change="this.form.numberId = this.form.numberId.toUpperCase()"></el-input>
          </el-form-item>
          <el-form-item label="Email" prop="email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-main>
  </el-col>

  <el-col :sm="24" :md="16">
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
            <el-button type="danger" @click="setValidationMethod(walideanNotAllowed)" plain>Introducirlo a mano</el-button>
          </el-row>
        </el-row>

        <el-row v-if="validationMethod==walideanNotAllowed">
          <el-container>
            <el-main>
              <el-form ref="form" :model="form" :rules="rules" label-width="120px" label-position="top" size="mini">
                <el-col :md="8" :sm="24">
                  <el-form-item label="Apellido 1" prop="surname1">
                    <el-input v-model="form.surname1"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :md="8" :sm="24">
                  <el-form-item label="Apellido 2" prop="surname2">
                    <el-input v-model="form.surname2"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :md="8" :sm="24">
                  <el-form-item label="Nombre" prop="name">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :md="8" :sm="24">
                  <el-form-item label="Fecha de nacimiento" prop="birthDate">
                    <el-date-picker type="date" placeholder="Selecciona una fecha" v-model="form.birthDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :md="8" :sm="24">
                  <el-form-item label="Nacionalidad" prop="nationality">
                    <el-select v-model="form.nationality" placeholder="Selecciona tu nacionalidad">
                      <el-option v-for="item in countries" :label="item" :value="item"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :md="8" :sm="24">
                  <el-form-item label="Numero DNI" prop="numberId">
                    <el-input v-model="form.numberId"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :md="8" :sm="24">
                  <el-form-item label="Localidad" prop="locality">
                    <el-input v-model="form.locality"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :md="8" :sm="24">
                  <el-form-item label="Provincia" prop="province">
                    <el-select v-model="form.province" placeholder="Selecciona tu provincia">
                      <el-option v-for="item in provinces" :label="item" :value="item"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :md="8" :sm="24">
                  <el-form-item label="Direccion" prop="address">
                    <el-input v-model="form.address"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :md="8" :sm="24">
                  <el-form-item label="Fecha de caducidad" prop="expirationDate">
                    <el-date-picker type="date" placeholder="Selecciona una fecha" v-model="form.expirationDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :md="8" :sm="24">
                  <el-form-item label="Email" prop="email">
                    <el-input v-model="form.email"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :md="8" :sm="24">
                  <el-form-item label="Sexo" prop="gender">
                    <el-radio-group v-model="form.gender">
                      <el-radio label="Hombre"></el-radio>
                      <el-radio label="Mujer"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>




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
          <el-col :md="18" :xs="24" v-if="validationMethod==walideanAllowed">
            <el-row justify="center" type="flex" class="legalTerms">
              <el-container>
                <el-main>
                  <div v-text="legalTerms">
                  </div>
                  <el-checkbox v-model="termsAccepted">He leido y acepto los terminos</el-checkbox>
                </el-main>
              </el-container>
            </el-row>
          </el-col>
        </el-row>

      </el-main>
    </el-container>
  </el-col>

  <el-col :sm="24" :md="24">
    <el-footer>
      <el-button type="primary" v-if="validationMethod==walideanNotAllowed" @click="onSubmit('form')" :disabled="disableButtonSend">Enviar
      </el-button>
      <el-button type="primary" v-if="validationMethod==walideanAllowed" @click="onSubmit('form2')" :disabled="disableButtonSend">Enviar
      </el-button>
      <el-button v-if="validationMethod==walideanNotAllowed" @click="resetForm('form')">Reset</el-button>
      <el-button v-if="validationMethod==walideanAllowed" @click="resetForm('form2')">Reset</el-button>
    </el-footer>
  </el-col>



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
    font-size: 40px;
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
        numberId: '',
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
      db: null,
      isMounted: false,
      controlDigits: ["T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X", "B", "N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E"],
      instructions: [{
        src: 'https://www.gsmliberar.net/dni/borrosa.png',
        tittle: 'Calidad',
        text: 'La imagen debe verse clara y nitida'
      }, {
        src: 'https://www.gsmliberar.net/dni/informacion.png',
        tittle: 'Información',
        text: 'Deben leerse correctamente todos los campos, no debe haber reflejos ni campos tachados u ocultos'
      }, {
        src: 'https://www.gsmliberar.net/dni/fondo.png',
        tittle: 'Fondo',
        text: 'La foto debe hacerse sobre un fondo oscuro'
      }, {
        src: 'https://www.gsmliberar.net/dni/marcos.png',
        tittle: 'Marcos',
        text: 'La foto debe hacerse sobre un fondo oscuro'
      }],

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
          var context = this;
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
      this.termsAccepted = false;
    },
    openSendDataAlert(userExists, userSnapshot, form) {
      var ref = this.db.ref("/users");
      var db = this.db;
      form = this.form;
      var uploadedFiles = this.$refs.upload.uploadFiles
      var context = this;
      var termsAccepted = this.termsAccepted;
      console.log("Abrir dialogo");
      this.$confirm('Vas a subir tus datos, seguro que son correctos?', 'Warning', {
        confirmButtonText: 'SI!',
        cancelButtonText: 'Cancelar',
        type: 'warning',
        center: true
      }).then(() => {
        var iddiligenceResponse;
        context.callIddiligence().then(function(response) {
          if (response == 'OK') {
            if (userExists == false) {
              db.ref('/users')
                .push({
                  numberId: form.numberId,
                  email: form.email,
                  validated: (response == 'OK' ? true : false),
                  intents: 1,
                  valideanAuth: termsAccepted
                })
              var intents = 1
            } else {
              db.ref('/users/' + userSnapshot.key)
                .update({
                  intents: userSnapshot.val().intents + 1,
                  validated: (response == 'OK' ? true : false),
                  valideanAuth: termsAccepted
                })
              var intents = userSnapshot.val().intents
            }
            uploadedFiles.forEach(function(element, index) {
              var file = element.raw // use the Blob or File API
              var storageRef = firebase.storage().ref();
              var mountainsRef = storageRef.child('users/' + form.numberId + '/' + intents + '/' + (index == 0 ? 'frontal' : 'trasera') + '.jpg');
              mountainsRef.put(file).then(function(snapshot) {
                console.log('Uploaded a blob or file!');
              });
            });
            context.$message({
              type: 'success',
              message: 'Autenticación realizada con exito!'
            });
            context.$router.push('/chicfy/done', () => console.log('Ruta cambiada')); // Home
          }
        }).catch(function(error) {
          // handle error
          console.log("Iddiligence responde error: " + error);
          context.$message({
            type: 'error',
            message: 'Fallo en el sistema de identificacion'
          });
        })
      })
    },
    callIddiligence() {
      var context = this;
      var operationId = null;
      var documentId = null;
      var viewId = null;
      var uploadedFiles = this.$refs.upload.uploadFiles
      const promise = new Promise(function(resolve, reject) {
        context.loginIddiligence().then((response) => {
            console.log("login realizado");
            context.createOperationIddiligence().then((response) => {
              operationId = response.operationId
              console.log("Create Operation realizado");
              context.createDocumentIddiligence(operationId).then((response) => {
                documentId = response.documentId
                console.log("Create Document realizado");
                context.createViewIddiligence(operationId, documentId).then((response) => {
                  console.log("Create View realizado");
                  viewId = response.viewId
                  uploadedFiles.forEach(function(element, index) {
                    var file = element.raw // use the Blob or File API
                    context.uploadFileIddiligence(operationId, documentId, viewId, file).then((response) => {
                      console.log("Peticion de subida de fichero a Iddiligence" + response);
                    }).catch((error) => {
                      console.log("Capturado error en Subir fichero Iddiligence");
                      if (operationId != null) {
                        context.closeOperationIddiligence(operationId).then((response) => {
                          reject('KO');
                          console.log("Aqui no deberia entrar 1");
                        })
                      }
                      console.log("Aqui no deberia entrar 2");
                      reject('KO');
                    })
                  });
                  context.closeOperationIddiligence(operationId).then((response) => {
                    console.log("Aqui no deberia entrar3");
                    resolve('OK');
                  })
                })
              })
            })
          })
          .catch((error) => {
            console.log("Capturado error en Login Iddiligence");
            if (operationId != null) {
              context.closeOperationIddiligence(operationId).then((response) => {
                reject('KO');
              })
            }
            reject('KO');
          })
      })
      return promise;
    },
    loginIddiligence() {
      const promise = new Promise(function(resolve, reject) {
        let config = {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
        axios
          .post('http://demos2.addalia.com/IDocValidationService2/resources/authenticate/', {
            user: "admin",
            pass: "admin"
          }, config)
          .then((response) => {
            console.log("Logueado correctamente en iddiligence" + response)
            if (response.status == 200) {
              resolve('OK');
            } else {
              reject('KO');
            }
          })
          .catch(function(error) {
            // handle error
            console.log("Iddiligence responde error: " + error);
            reject('KO');
          })
      })
      return promise;
    },
    createOperationIddiligence() {
      var context = this;
      const promise = new Promise(function(resolve, reject) {
        let config = {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
        axios
          .post('http://demos2.addalia.com/IDocValidationService2/resources/operations/new/', {
            attributes: {
              operation_name: "Operacion de Prueba 1",
              operation_number: "00000001"
            }
          }, config)
          .then((response) => {
            console.log("Creada correctamente operacion en Iddiligence")
            console.log(response.data)
            if (response.status == 200) {
              resolve(response.data);
            } else {
              reject('KO');
            }
          })
          .catch(function(error) {
            // handle error
            console.log("Iddiligence responde error: " + error);
            reject('KO');
          })
      })
      return promise;
    },
    closeOperationIddiligence(operationId) {
      var context = this;
      const promise = new Promise(function(resolve, reject) {
        let config = {
          withCredentials: true
        }
        axios
          .post('http://demos2.addalia.com/IDocValidationService2/resources/operations/' + operationId, {}, config)
          .then((response) => {
            console.log("Cerrada correctamente operacion en Iddiligence")
            console.log(response.data)
            if (response.status == 200) {
              resolve('OK');
            } else {
              reject('KO');
            }
          })
          .catch(function(error) {
            // handle error
            console.log("Iddiligence responde error: " + error);
            reject('KO');
          })
      })
      return promise;
    },
    createDocumentIddiligence(operationNumber) {
      var context = this;
      const promise = new Promise(function(resolve, reject) {
        let config = {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
        console.log("El operation Number es el siguiente" + operationNumber);
        console.log("El DNI a comprobar es" + context.form.numberId);
        axios
          .post('http://demos2.addalia.com/IDocValidationService2/resources/operations/' + operationNumber + '/new/', {
            type: "Dni",
            attributes: {
              dni_number: context.form.numberId
            }
          }, config)
          .then((response) => {
            console.log("Creado correctamente documento en Iddiligence");
            console.log(response);
            if (response.status == 200) {
              resolve(response.data);
            } else {
              reject('KO');
            }
          })
          .catch(function(error) {
            // handle error
            console.log("Iddiligence responde error: " + error);
            reject('KO');
          })
      })
      return promise;
    },
    createViewIddiligence(operationNumber, documentId) {
      var context = this;
      const promise = new Promise(function(resolve, reject) {
        let config = {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
        console.log("Operation number y documentId son los siguientes: " + operationNumber + '-' + documentId);
        axios
          .post('http://demos2.addalia.com/IDocValidationService2/resources/operations/' + operationNumber + '/' + documentId + '/new/', {
            attributes: {
              view_origin: 'Web',
              page: 1
            }
          }, config)
          .then((response) => {
            console.log("Creada correctamente vista en Iddiligence" + response)
            if (response.status == 200) {
              resolve(response.data);
            } else {
              reject('KO');
            }
          })
          .catch(function(error) {
            // handle error
            console.log("Iddiligence responde error: " + error);
            reject('KO');
          })
      })
      return promise;
    },
    uploadFileIddiligence(operationNumber, documentId, viewId, file) {
      var context = this;
      const promise = new Promise(function(resolve, reject) {
        let config = {
          headers: {
            'Content-Type': 'application/octet-stream',
            'Mime-Type': 'image/JPG'
          },
          withCredentials: true
        }
        console.log("Operation number, documentId y viewId son los siguientes: " + operationNumber + '-' + documentId + '-' + viewId);
        axios
          .put('http://demos2.addalia.com/IDocValidationService2/resources/operations/' + operationNumber + '/' + documentId + '/' + viewId + '/file', {
            data: file
          }, config)
          .then((response) => {
            console.log("Subido Documento a Iddiligence" + response)
            if (response.status == 200) {
              resolve('OK');
            } else {
              reject('KO');
            }
          })
          .catch(function(error) {
            // handle error
            console.log("Iddiligence responde error: " + error);
            reject('KO');
          })
      })
      return promise;
    }
  },
  computed: {
    disableButtonSend: function() {
      if (!this.isMounted)
        return;
      console.log("Loles");
      console.log((this.termsAccepted == false && this.validationMethod == this.walideanAllowed) || this.$refs.upload.uploadFiles.length < 2);
      return ((this.termsAccepted == false && this.validationMethod == this.walideanAllowed) || this.$refs.upload.uploadFiles.length < 2);
    }
  },
  mounted() {
    this.isMounted = true;
    //Iddiligence llamar a login
  },
  created() {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyBVwrpVjSABKmSQ-5H_QFXiBPzKfcTAOkA",
      authDomain: "walidean.firebaseapp.com",
      databaseURL: "https://walidean.firebaseio.com",
      projectId: "walidean",
      storageBucket: "walidean.appspot.com",
      messagingSenderId: "832613647991"
    };
    firebase.initializeApp(config);
    this.db = firebase.database();
    //Iddiligence llamar a login
  }
}
</script>
