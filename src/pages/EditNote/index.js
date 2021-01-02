import React, {useState, useEffect, useLayoutEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';

import {
  Container,
  TitleInput,
  BodyInput,
  SaveButton,
  SaveButtonImage,
  CloseButton,
  CloseButtonImage,
  DeleteButton,
  DeleteButtonText,
} from './styles';

export default () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const list = useSelector((state) => state.notes.list);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [status, setStatus] = useState('new');

  const handleCloseButton = () => {
    navigation.goBack();
  };

  const handleSaveButton = () => {
    if (title != '' && body != '') {
      if (status == 'edit') {
        dispatch({
          type: 'EDIT_NOTE',
          payload: {
            key: route.params.key,
            title,
            body,
          },
        });
      } else if (status == 'new') {
        dispatch({
          type: 'ADD_NOTE',
          payload: {
            title,
            body,
          },
        });
      }
      navigation.goBack();
    } else if (title == '' && body == '') {
      alert('Preencha o título e descrição');
    } else if (title == '') {
      alert('Preencha a título da nota');
    } else {
      alert('Preencha a descrição da nota');
    }
  };

  const handleDeleteNoteButton = () => {
    dispatch({
      type: 'DEL_NOTE',
      payload: {
        key: route.params.key,
      },
    });
    navigation.goBack();
  };

  useEffect(() => {
    if (route.params?.key != undefined && list[route.params.key]) {
      setStatus('edit');
      setTitle(list[route.params.key].title);
      setBody(list[route.params.key].body);
    }
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: status == 'new' ? 'Nova Anotação' : 'Editar Anotação',
      headerLeft: () => (
        <CloseButton underlayColor="transparent" onPress={handleCloseButton}>
          <CloseButtonImage
            source={require('../../assets/close.png')}></CloseButtonImage>
        </CloseButton>
      ),
      headerRight: () => (
        <SaveButton underlayColor="transparent" onPress={handleSaveButton}>
          <SaveButtonImage
            source={require('../../assets/save.png')}></SaveButtonImage>
        </SaveButton>
      ),
    });
  }, [status, title, body]);

  return (
    <Container>
      <TitleInput
        value={title}
        onChangeText={(e) => setTitle(e)}
        placeholder="Digite o título da anotação"
        placeholderTextColor="#ccc"
        autoFocus={true}></TitleInput>
      <BodyInput
        value={body}
        onChangeText={(e) => setBody(e)}
        placeholder="Digite o título da anotação"
        placeholderTextColor="#ccc"
        multiline={true}
        textAlignVertical="top"></BodyInput>
      {status == 'edit' && (
        <DeleteButton underlayColor="#FF0000" onPress={handleDeleteNoteButton}>
          <DeleteButtonText>Excluir anotação</DeleteButtonText>
        </DeleteButton>
      )}
    </Container>
  );
};
