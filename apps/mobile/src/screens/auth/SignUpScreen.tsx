import { useState } from "react";


const SignUpScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    
    
    
    return (
        <View style={styles.container}>
        <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Name"
        />
        <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
        />
        <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
        />
        <Button title="Sign Up" onPress={signUp} />
        </View>
    );
    }