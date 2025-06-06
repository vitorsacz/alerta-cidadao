import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar
} from 'react-native';
import SetaVoltar from '../../components/seta.voltar';


interface ProfileProps {}

interface ProfileState {
  userName: string;
  userEmail: string;
  profileImageUrl: string;
}


class ProfileScreen extends Component<ProfileProps, ProfileState> {

  constructor(props: ProfileProps) {
    super(props);
    
    this.state = {
      userName: 'Lorenzo Vaz',
      userEmail: 'lorenzovaz@gmail.com',
      profileImageUrl: 'https://i.pravatar.cc/150?u=lorenzovaz' //
    };
  }

  
  handleLogout = () => {
    console.log('Usuário clicou em Sair da conta');
    
  };

  render() {
    const { userName, userEmail, profileImageUrl } = this.state;

    return (
      <SafeAreaView style={styles.container}>

        <StatusBar barStyle="dark-content" />
        <View style={styles.content}>
          <Text style={styles.welcomeText}>Bem-vindo ao seu perfil,</Text>

          <Image
            source={{ uri: profileImageUrl }}
            style={styles.profileImage}
          />

          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={this.handleLogout}
          >
            <Text style={styles.logoutButtonText}>Sair da conta</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
  },
  content: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 40,
    alignSelf: 'center'
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60, 
    marginBottom: 20,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#666', 
    marginBottom: 60,
  },
  logoutButton: {
    backgroundColor: '#FF3B30', 
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 10,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;