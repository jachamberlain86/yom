import React, { useState } from 'react';
import { Text, View, Pressable, Button } from 'react-native';
import pluralize from 'pluralize';
import prettyMilliseconds from 'pretty-ms';
import { useDispatch } from 'react-redux';
import { toggleInPlan } from '../../../features/Recipes/recipesSlice.js';

export default function RecipeCard ( { navigation, recipe } ) {
  const [ cardDetails, setCardDetails ] = useState( null );
  const dispatch = useDispatch();

  const timeMilliseconds = recipe.timeMinutes * 60000;
  const prettyTime = prettyMilliseconds( timeMilliseconds, { secondsDecimalDigits: 0, verbose: true } );
  let renderRating = null;
  if ( recipe.rating ) {
    renderRating = <Text>{ recipe.rating }</Text>;
  }

  function hideDetails () {
    setCardDetails( null );
  }

  function showDetails () {
    setCardDetails(
      <View>
        <Text>{ recipe.servingSize.type } { recipe.servingSize.number }</Text>
        <Text>{ prettyTime }</Text>
        <Text>{ renderRating }</Text>
        <Button
          title='Close'
          onPress={ hideDetails }
        />
      </View>
    );
  }

  function handlePlanBtn () {
    dispatch( toggleInPlan() );
  }

  const renderPlanBtn = recipe.inPlan ?
    <Button
      title='-'
      onPress={ handlePlanBtn }
    />
    : <Button
      title='+'
      onPress={ handlePlanBtn }
    />;


  return (
    <View>
      <Pressable
        onPress={ () => navigation.navigate( 'Recipe Item', { recipe } ) }
        onLongPress={ showDetails }
      >
        <View>
          <Text>{ recipe.title }</Text>
        </View>
      </Pressable>
      {renderPlanBtn }
      { cardDetails }
    </View>
  );
}
