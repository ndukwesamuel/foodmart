import React, { useState, useEffect } from "react";
import { View, Text, Image, Pressable, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

const greenMarker = require("../../../../assets/greenmarker.png");
const redMarker = require("../../../../assets/redmarker.png");
const line = require("../../../../assets/arrow-line.png");
const arrowRight = require("../../../../assets/arrow-left.png");

const BeginTripDetails = ({ onShowDetailsModal, onShowStartModal }) => {
  const navigation = useNavigation();

  const list = [{}, {}, {}, {}, {}, {}, {}];

  const [timeLeft, setTimeLeft] = useState(2 * 60 * 60); // 3 hours in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        marginTop: -10,
        justifyContent: "space-between",
        padding: 10,
      }}
    >
      {/* container details */}
      <View style={{ gap: 10 }}>
        {/* heading */}
        <Text
          style={{
            fontSize: 16,
            fontWeight: "900",
            lineHeight: 36,
            color: "#04262F",
            textAlign: "center",
          }}
        >
          Your Trip Start In
        </Text>

        {/* timer */}
        <View style={{ alignSelf: "center", flexDirection: "row", gap: 10 }}>
          {/* hour */}
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                borderWidth: 0.5,
                height: 48,
                width: 46,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontWeight: "700", fontSize: 18, lineHeight: 22 }}>
                {hours.toString().padStart(2, "0")}
              </Text>
            </View>
            <Text>Hour</Text>
          </View>

          {/* min */}
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                borderWidth: 0.5,
                height: 48,
                width: 46,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontWeight: "700", fontSize: 18, lineHeight: 22 }}>
                {minutes.toString().padStart(2, "0")}
              </Text>
            </View>
            <Text>Min</Text>
          </View>

          {/* sec */}
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                borderWidth: 0.5,
                height: 48,
                width: 46,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontWeight: "700", fontSize: 18, lineHeight: 22 }}>
                {seconds.toString().padStart(2, "0")}
              </Text>
            </View>
            <Text>Sec</Text>
          </View>
        </View>

        {/* bus stations */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 5,
          }}
        >
          {/* left */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Image source={greenMarker} />
            <View>
              <Text
                style={{
                  fontSize: 12,
                  color: "#1E0000",
                  opacity: 0.4,
                  lineHeight: 18.04,
                }}
              >
                Pickup Bus stop
              </Text>
              <Text style={{ lineHeight: 21.04 }}>Ikeja Along</Text>
            </View>
          </View>

          {/* center */}
          <View
            style={{
              width: "30%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image source={line} style={{ width: "90%" }} />
            <Image source={arrowRight} style={{ height: 10, marginLeft: -5 }} />
          </View>

          {/* right */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Image source={redMarker} />
            <View>
              <Text
                style={{
                  fontSize: 12,
                  color: "#1E0000",
                  opacity: 0.4,
                  lineHeight: 18.04,
                }}
              >
                Dropoff Bus stop
              </Text>
              <Text style={{ lineHeight: 21.04 }}>Lekki Phase 1...</Text>
            </View>
          </View>
        </View>

        {/* DEPARTMENT TIME */}
        <View
          style={{
            borderWidth: 0.5,
            padding: 10,
            borderColor: "#1E000033",
            borderRadius: 12,
            gap: 10,
          }}
        >
          {/* Departure time */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 16, lineHeight: 24.05, color: "#1E0000" }}>
              Departure time
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                lineHeight: 24.05,
                color: "#1E0000",
              }}
            >
              8:30 AM
            </Text>
          </View>

          {/* route */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 16, lineHeight: 24.05, color: "#1E0000" }}>
              Route
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                lineHeight: 24.05,
                color: "#1E0000",
              }}
            >
              Surelere Staudium Way
            </Text>
          </View>
        </View>

        {/* passenger list */}
        <FlatList
          style={{
            borderWidth: 1,
            borderRadius: 12,
            paddingBottom: 10,
            height: "45%",
          }}
          data={list}
          ListHeaderComponent={
            <View style={{ paddingBottom: 10, padding: 10 }}>
              <Text
                style={{ lineHeight: 24.05, fontSize: 16, fontWeight: "700" }}
              >
                10 Passengers
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <Pressable
              onPress={() => onShowDetailsModal(true)}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 10,
                borderBottomWidth: 0.5,
              }}
            >
              <Text style={{ fontSize: 16, lineHeight: 24.05 }}>
                Tayo Makinde
              </Text>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 2 }}
              >
                <Text style={{ fontSize: 16, lineHeight: 24.05 }}>4253</Text>
                <Image style={{ height: 20, width: 20 }} source={arrowRight} />
              </View>
            </Pressable>
          )}
        />
      </View>

      {/* buttons */}
      <View style={{ gap: 5, padding: 10 }}>
        <Pressable
          onPress={() => onShowStartModal(true)}
          style={{ backgroundColor: "#001272", padding: 10, borderRadius: 8 }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 16,
              fontWeight: "700",
              lineHeight: 24.05,
            }}
          >
            Start Trip
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default BeginTripDetails;
