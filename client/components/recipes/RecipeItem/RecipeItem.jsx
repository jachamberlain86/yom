import React from 'react';
import { Text, View } from 'react-native';
import pluralize from 'pluralize';
import prettyMilliseconds from 'pretty-ms';
import { useSelector } from 'react-redux';

export default function RecipeItem ( { route, navigation } ) {
  const currentUser = useSelector( state => state.user.currentUser );
  const { recipe } = route.params;

  const timeMilliseconds = recipe.timeMinutes * 60000;
  const prettyTime = prettyMilliseconds( timeMilliseconds, { secondsDecimalDigits: 0, verbose: true } );
  let renderRating = null;
  if ( recipe.rating ) {
    renderRating = <Text>{ recipe.rating }</Text>;
  }

  const renderedIngredients = recipe.ingredients.map( ingredient => {
    const pluralUnit = pluralize( ingredient[ currentUser.unitPref ].unit, ingredient[ currentUser.unitPref ].quantity, true );
    return (
      < Text key={ ingredient.ingredient } > - { pluralUnit } { ingredient.modifier } { ingredient.ingredient }</Text>
    );
  }
  );

  const renderedSteps = recipe.steps.map( step => (
    <View key={ step.number }>
      <Text>Step { step.number }:</Text>
      <Text>{ step.instruction }</Text>
    </View>
  ) );

  let renderNotes = null;
  if ( recipe.notes ) {
    renderNotes =
      <View>
        <Text>Notes:</Text>
        <Text>{ recipe.notes }</Text>
      </View>;
  }

  return (
    <View>
      <Text>{ recipe.title }</Text>
      <Text>{ recipe.servingSize.type } { recipe.servingSize.number }</Text>
      <Text>{ prettyTime }</Text>
      { renderRating }
      { renderedIngredients }
      { renderedSteps }
      { renderNotes }
      <Text>Source: { recipe.source }</Text>

    </View>
  );
}