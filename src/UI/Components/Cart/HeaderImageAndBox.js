import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, TextInput, TouchableOpacity, SectionList } from 'react-native';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '@Utils/Helper/DeviceHelper';
import { ScrollView } from 'react-native-gesture-handler';
import SectionHeader from '@Components/Common/SectionHeader';
import CartSectionListItem from '@Components/Cart/CartSectionListItem';

export default class componentName extends Component {
	constructor(props) {
		super(props);
	}

	clickedRemove() {
		this.props.callback();
	}
	renderExtraInstruction = () => {
		if (this.props.item.Food_Attribute) {
			if (this.props.item.Food_Attribute.length > 0) {
				return (
					<View>
						<SectionList
							scrollEnabled={false}
							style={{ flex: 1 }}
							renderItem={({ item, index, section }) => <CartSectionListItem key={index} item={item} />}
							renderSectionHeader={({ section: { title } }) => <SectionHeader>{title}</SectionHeader>}
							sections={[{ title: 'Extra Instruction', data: this.props.item.Food_Attribute }]}
							keyExtractor={(item, index) => item + index}
						/>
						{/* <GoodBiteeSectionFlatList arrayList={this.props.item.Food_Attribute} listType={'add_to_cart_section_list'} /> */}
					</View>
				);
			}
		}
	};
	render() {
		return (
			<View style={styles.imageOverImage}>
				<ScrollView showsVerticalScrollIndicator={false} bounces={false}>
					<Text style={styles.header}>{this.props.item.food_name}</Text>
					<View style={{ height: 5 }} />
					{this.props.item.Food_Attribute > 0 ? (
						<Text style={[styles.header, { fontSize: 13, color: 'gray', fontWeight: 'normal' }]}>
							{this.props.item.offer_price}
						</Text>
					) : (
						<Text style={[styles.header, { fontSize: 13, color: 'gray', fontWeight: 'normal' }]}>
							{this.props.item.amount}
						</Text>
					)}
					<View style={{ height: 5 }} />
					<View style={styles.lineStyle} />
					<View style={{ height: 5 }} />
					<View style={styles.sectionContainer}>
						{this.renderExtraInstruction()}

						{/* {this.props.remove == 1 ? null : (
							<View>
								<GoodBiteeSectionFlatList
									arrayList={this.props.item.Food_Attribute}
									listType={'add_to_cart_section_list'}
								/>
							</View>
						)} */}

						<View style={{ height: 5 }} />
						<SectionHeader style={{ width: '100%' }}>Special Instructions</SectionHeader>
						<View style={{ height: 5 }} />
						<View style={styles.textAreaContainer}>
							<TextInput
								multiline={true}
								numberOfLines={5}
								style={styles.textArea}
								underlineColorAndroid="transparent"
								placeholder="Add a note(extra sauce,no onions,etc.)"
								placeholderTextColor="grey"
							/>
						</View>
					</View>
					<View style={{ height: 5 }} />
					<View style={styles.cartItems}>
						{this.props.quantity == 1 ? (
							<View style={[styles.items, { borderColor: '#ccc' }]}>
								<Text style={{ color: '#ccc', fontSize: 20 }}>-</Text>
							</View>
						) : (
							<TouchableOpacity style={styles.items}>
								<Text style={{ color: '#6bb003', fontSize: 20 }} onPress={this.props.onPressDecrease}>
									-
								</Text>
							</TouchableOpacity>
						)}

						<TouchableOpacity style={{ paddingLeft: 10, marginTop: 5 }}>
							<Text style={{ color: '#6bb003', fontSize: 20 }}>{this.props.quantity}</Text>
						</TouchableOpacity>
						<View style={{ width: 10 }} />
						<TouchableOpacity style={styles.items} onPress={this.props.onPressIncrease}>
							<Text style={{ color: '#6bb003', fontSize: 20 }}>+</Text>
						</TouchableOpacity>
					</View>
					{this.props.remove == 1 ? (
						<TouchableOpacity onPress={() => this.clickedRemove()}>
							<Text style={{ fontWeight: '500', color: 'red', marginTop: 5 }}>Remove item from cart</Text>
						</TouchableOpacity>
					) : null}
				</ScrollView>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	imageOverImage: {
		backgroundColor: 'white',
		marginTop: -50,
		width: '90%',
		height: '58%',
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: { width: 2, height: 1 },
		shadowOpacity: 0.5,
		shadowRadius: 5,
		elevation: 10,
		padding: 10,
		alignSelf: 'center'
		//elevation use only for android
		//for IOS
	},
	header: { fontSize: 20, fontWeight: 'bold', color: 'black' },
	lineStyle: {
		borderWidth: 0.5,
		borderColor: 'gray'
	},
	textAreaContainer: {
		//marginTop: 15,
		backgroundColor: '#f5f5f5',
		borderRadius: 10,
		justifyContent: 'center'
	},
	textArea: {
		height: 50,
		textAlignVertical: 'top',
		margin: 10,
		justifyContent: 'flex-start'
	},
	cartItems: {
		flexDirection: 'row'
		//marginTop: 15,
		//marginBottom: 10
	},
	items: {
		width: 40,
		height: 40,
		borderRadius: 20,
		borderWidth: 1,
		//marginLeft: 10,
		paddingLeft: 13,
		paddingTop: 5,
		backgroundColor: 'white',
		borderColor: '#6bb003'
	},
	sectionList: {
		flex: 1
		//borderRadius: 5
	},
	sectionContainer: {
		borderRadius: 5
		//paddingLeft: 10,
		//paddingRight: 10,
		//borderWidth: 1
	}
});
