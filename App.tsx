import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';
import {object, string, number, date, InferType} from 'yup';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

let userSchema = object({
  passwordLength: number()
    .min(4, 'passwordLength must be greater than 4')
    .max(16, 'passwordLength must be less than 16')
    .required('Length is required'),
});

const App = () => {
  const [lowercase, setLowercase] = useState(true);
  const [uppercase, setUppercase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [isPassGenerated, setIsPassGenerated] = useState(false);
  const [password, setPassword] = useState('');
  const generatePassword = (passwordLength: number) => {
    let result = '';
    let characters = '';
    if (lowercase) {
      characters += 'abcdefghijklmnopqrstuvwxyz';
    }
    if (uppercase) {
      characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    if (numbers) {
      characters += '0123456789';
    }
    if (symbols) {
      characters += '!@#$%^&*';
    }
    for (let i = 0; i < passwordLength; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    setPassword(result);
    setIsPassGenerated(true);
  };
  const resetPassword = () => {
    setLowercase(true);
    setUppercase(false);
    setNumbers(false);
    setSymbols(false);
    setPassword('');
    setIsPassGenerated(false);
  };
  return (
    <View>
      <View>
        <Text style={styles.mainHeading}>Password Generator</Text>
      </View>
      <Formik
        initialValues={{passwordLength: ''}}
        onSubmit={values => {
          console.log(values);
          generatePassword(Number(values.passwordLength));
        }}
        validationSchema={userSchema}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          isValid,
          handleReset,
          values,
        }) => (
          <View>
            <View style={styles.formContainer}>
              <Text style={styles.lengthHeading}>Enter Password Length: </Text>
              <TextInput
                style={styles.lengthInput}
                onChangeText={handleChange('passwordLength')}
                onBlur={handleBlur('passwordLength')}
                value={values.passwordLength}
                keyboardType="number-pad"
              />
            </View>
            <View style={styles.secondContainer}>
              <Text>Include Lowercase: </Text>
              <BouncyCheckbox
                fillColor="red"
                isChecked={lowercase}
                onPress={() => setLowercase(!lowercase)}
              />
            </View>
            <View style={styles.secondContainer}>
              <Text>Include Uppercase: </Text>
              <BouncyCheckbox
                fillColor="blue"
                isChecked={uppercase}
                onPress={() => setUppercase(!uppercase)}
              />
            </View>
            <View style={styles.secondContainer}>
              <Text>Include Numbers: </Text>
              <BouncyCheckbox
                fillColor="green"
                isChecked={numbers}
                onPress={() => setNumbers(!numbers)}
              />
            </View>
            <View style={styles.secondContainer}>
              <Text>Include Symbols: </Text>
              <BouncyCheckbox
                fillColor="orange"
                isChecked={symbols}
                onPress={() => setSymbols(!symbols)}
              />
            </View>
            <View style={styles.btnStyles}>
              <TouchableOpacity
                disabled={!isValid}
                style={styles.generateBtn}
                onPress={() => {
                  handleSubmit(), setIsPassGenerated(true);
                }}>
                <Text
                  style={{
                    color: 'black',
                  }}>
                  Generate
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.resetBtn}
                onPress={() => {
                  handleReset(), resetPassword();
                }}>
                <Text
                  style={{
                    color: 'black',
                  }}>
                  Reset
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              {isPassGenerated && (
                <Text
                  selectable={true}
                  style={{
                    alignSelf: 'center',
                    marginTop: 30,
                  }}>
                  {password}
                </Text>
              )}
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  mainHeading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  formContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lengthHeading: {
    marginLeft: '5%',
  },
  lengthInput: {
    marginRight: '10%',
    width: '15%',
    borderColor: 'white',
    borderRadius: 2,
    borderWidth: 0.6,
    height: '70%',
  },
  generateBtn: {
    backgroundColor: '#17A9FD',
    borderRadius: 20,
    fontWeight: 'bold',
    padding: 7,
    marginRight: 10,
  },
  resetBtn: {
    backgroundColor: 'white',
    borderRadius: 20,
    fontWeight: 'bold',
    padding: 7,
  },
  btnStyles: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '5%',
  },
  secondContainer: {
    marginLeft: '10%',
    marginTop: '2%',
    marginBottom: '2%',
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default App;
