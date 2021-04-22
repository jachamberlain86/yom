import React, { useState } from 'react';
import { Text, View, TextInput, Button } from 'react-native';

export default function AddText () {
  const [ id, setId ] = useState( null );
  const [ title, setTitle ] = useState( '' );
  const [ servingSize, setServingSize ] = useState( 0 );
  const [ timeMinutes, setTimeMinutes ] = useState( 0 );
  const [ ingredients, setIngredients ] = useState( [] );
  const [ steps, setSteps ] = useState( [] );
  const [ notes, setNotes ] = useState( '' );
  const [ source, setSource ] = useState( '' );
  const [ imageUrl, setImageUrl ] = useState( null );
  const [ tags, setTags ] = useState( [] );
  const [ dateAdded, setDateAdded ] = useState( '' );
  const [ rating, setRating ] = useState( null );
  const [ inPlan, setInPlan ] = useState( false );
  const [ favourite, setFavourite ] = useState( false );


  return (
    <View style={ { flex: 1, justifyContent: 'center', alignItems: 'center' } }>
      <Text>Add Recipe</Text>
      <Text>Title</Text>
      <TextInput
        placeholder='title'
        style={ { height: 40 } }
        multiline
        onChangeText={ ( title ) => setTitle( { ...title, title } ) }
      />
      <Text>Serving size</Text>
      <TextInput
        placeholder='serving size'
        onChangeText={ ( servingSize ) => setServingSize( { ...servingSize, servingSize } ) }
      />
      <Text>Time</Text>
      <TextInput
        placeholder='time to prepare'
        onChangeText={ ( timeMinutes ) => setTimeMinutes( { ...timeMinutes, timeMinutes } ) }
      />
      <View>
        <Text>Ingredients</Text>
        <Button title='Add ingredient' />
      </View>
      <View>
        <Text>Steps</Text>
        <Button title='Add step' />
      </View>
      <Text>Notes</Text>
      <TextInput
        placeholder='additional notes'
        onChangeText={ ( notes ) => setNotes( { ...notes, notes } ) }
      />
      <Text>Source</Text>
      <TextInput
        placeholder='source'
        onChangeText={ ( source ) => setSource( { ...source, source } ) }
      />
      <View>
        <Text>Image</Text>
        <Button title='Add image' />
      </View>
      <View>
        <Text>Tags</Text>
        <Button title='Add tag' />
      </View>
      <View>
        <Text>YOM Rating</Text>
        <Button title='increase' />
        <Button title='decrease' />
      </View>
      <Button title='Save' />

    </View>
  );
}