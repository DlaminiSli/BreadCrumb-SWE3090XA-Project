import React from "react";

import { View } from "react-native";

import { Picker } from "@react-native-picker/picker";

import styles from "./CountryDropdownStyles";

const countries = [

    {
        country: "Eswatini",
        countryCode: "+268",
        flag: "🇸🇿"
    },

    {
        country: "South Africa",
        countryCode: "+27",
        flag: "🇿🇦"
    },

    {
        country: "Lesotho",
        countryCode: "+266",
        flag: "🇱🇸"
    },

    {
        country: "Botswana",
        countryCode: "+267",
        flag: "🇧🇼"
    },

    {
        country: "Mozambique",
        countryCode: "+258",
        flag: "🇲🇿"
    },

    {
        country: "Namibia",
        countryCode: "+264",
        flag: "🇳🇦"
    },

    {
        country: "Zimbabwe",
        countryCode: "+263",
        flag: "🇿🇼"
    },

    {
        country: "Zambia",
        countryCode: "+260",
        flag: "🇿🇲"
    },

    {
        country: "Kenya",
        countryCode: "+254",
        flag: "🇰🇪"
    }

];

export default function CountryDropdown({

    selectedCountry,

    setSelectedCountry

}) {

    return (

        <View style={styles.container}>

            <Picker

                selectedValue={selectedCountry.countryCode}

                onValueChange={(value) => {

                    const country = countries.find(

                        item => item.countryCode === value

                    );

                    setSelectedCountry(country);

                }}

            >

                {

                    countries.map((country) => (

                        <Picker.Item

                            key={country.countryCode}

                            label={`${country.flag} ${country.country} (${country.countryCode})`}

                            value={country.countryCode}

                        />

                    ))

                }

            </Picker>

        </View>

    );

}