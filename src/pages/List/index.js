import React, {useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import NoteItem from '../../components/NoteItem';

import {
  Container,
  AddButton,
  AddButtonImage,
  NotesList,
  NoNotes,
  NoNotesImage,
  NoNotesText,
} from './styles';

export default () => {
  const navigation = useNavigation();
  const list = useSelector((state) => state.notes.list);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Suas notas',
      headerRight: () => (
        <AddButton
          underlayColor="transparent"
          onPress={() => {
            navigation.navigate('EditNote');
          }}>
          <AddButtonImage
            source={require('../../assets/more.png')}></AddButtonImage>
        </AddButton>
      ),
    });
  }, []);

  const handleNotePress = (index) => {
    navigation.navigate('EditNote', {
      key: index,
    });
  };
  return (
    <Container>
      {list.length > 0 ? (
        <NotesList
          data={list}
          renderItem={({item, index}) => (
            <NoteItem
              data={item}
              index={index}
              onPress={handleNotePress}></NoteItem>
          )}
          keyExtractor={(item, index) => index.toString()}></NotesList>
      ) : (
        <NoNotes>
          <NoNotesImage
            source={require('../../assets/note.png')}></NoNotesImage>
          <NoNotesText>Você não possui anotações</NoNotesText>
        </NoNotes>
      )}
    </Container>
  );
};
