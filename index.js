import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, Modal, Image} from 'react-native';
import {TriangleColorPicker, fromHsv} from 'react-native-color-picker';

const styles =  StyleSheet.create({
    customColorPicker: {
        flexDirection: "row",
        justifyContent: "flex-start",
        zIndex: 2
    },
    textInput: {
        height: 50,
        fontSize: 30,
        margin: 0,
        width: 200,
        borderWidth: 2,
        borderColor: "black",
        paddingLeft: 2,
        borderLeftWidth: 0
    },
    preview: {
        height: 50,
        width: 50,
        borderWidth: 2,
        borderColor: "black"
    },
    pickerButton: {
        width: 50,
        height: 50,
        backgroundColor: "black",
        justifyContent: "center",
        alignContent: "center",
        flexDirection: "row",
        borderWidth: 2
    },
    pickerButtonText: {
        color: "#ECECEC",
        fontSize: 30,
        textAlign: "center"
    },
    pickerView: {
        width: "100%",
        height: "100%",
        flexDirection: "column",
        backgroundColor: "white",
        padding: 10
    },
    pickerViewHeader: {
        height: 50,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    pickerViewBottom: {
        paddingTop: 100,
        width: "100%",
        paddingBottom: 20
    },
    pickerViewHeaderButtonText: {
        color: "black",
        fontSize: 30
    },
    pickerViewCarot: {
        transform: [{rotate: "45deg"}],
        borderTopWidth: 10,
        borderLeftWidth: 10,
        borderColor: "black",
        position: "absolute",
        zIndex: 99999999999,
        width: 50,
        height: 50,
        left: 40,
        top: -33,
        backgroundColor: "white"
    },
    backgroundView: {
        width: "100%",
        height: 4000,
        left: 0,
        top: -2000,
        flexDirection: "column",
        justifyContent: "center",
        zIndex: 5,
        position: "absolute"
    },
    colorPickerImage: {
        width: 30,
        height: 30,
        paddingTop: 10
    }
});


export default class CustomColorPicker extends Component {

    constructor(){
        super();
        this.state = {
            color: "",
            visible: false
        }
    }

    componentDidMount(){
        this.setState({
            color: this.props.color
        });
    }

    onUpdate = (t) => {
        this.setState({
            color: t
        });
    }

    onEndEditing = () => {
        const {color} = this.state;
        if(color[0] == "#" && color.length == 7 && color.slice(1).match(/(^[_A-z0-9]*((-|\s)*[_A-z0-9])*$)/) && color.slice(1).indexOf(" ") == -1){
            this.props.setColor(color);
        }else{
            this.setState({
                color: this.props.color
            });
        }
    }

    submitModal = () => {
        this.onEndEditing();
        this.closeModal();
    }

    cancelModal = () => {
        this.setState({
            color: this.props.color
        });
        this.closeModal();
    }

    closeModal = () => {
        this.setState({
            visible: false
        });
        if(this.props.onClose){
            this.props.onClose();
        }
    }

    openModal = () => {
        this.setState({
            visible: true
        });
        if(this.props.onOpen){
            this.props.onOpen();
        }
    }


    render(){
        const {color, onTop} = this.props;
        return(
        <View>
            <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.visible}
            onRequestClose={() => this.cancelModal()}
            >
                <View style={styles.pickerView}>
                    <View style={styles.pickerViewHeader}>
                        <TouchableOpacity onPress={() => this.cancelModal()}>
                            <Text style={styles.pickerViewHeaderButtonText}>{'< Back'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.submitModal}>
                            <Text style={styles.pickerViewHeaderButtonText}>
                                Done
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.pickerViewBottom}>
                        <TriangleColorPicker
                            onColorChange={c => this.setState({color: fromHsv(c)})}
                            defaultColor={color}
                            style={{width: "100%", height: 300}}
                        />
                    </View>
                </View>
            </Modal>
            <View style={styles.customColorPicker}>
                <View style={[styles.preview, {backgroundColor: color}]}></View>
                <TextInput value={this.state.color} style={[styles.textInput, Dimensions.get('window').width < 400 && {width: 130}]} onEndEditing={this.onEndEditing} onChangeText={(t) => this.onUpdate(t)}/>
                <TouchableOpacity onPress={this.openModal}>
                    <View style={styles.pickerButton}>
                        <Image source={require("./colorpicker.png")} style={styles.colorPickerImage} resizeMode="contain"/>
                    </View>
                </TouchableOpacity>
            </View> 
        </View>
        );     
    }
}