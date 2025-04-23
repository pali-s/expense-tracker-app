import React, { useEffect, useState } from 'react';
import AddExpenseForm from '@/components/addExpense';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
    Animated,
    Easing,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getExpensesByUser } from '@/services/expenseService';
import { getProfile } from '@/services/authService';
import { useBudgetContext } from '@/context/budgetcontext';
import BudgetModal from '@/components/budgetModal';
import ExpenseProgressBar from '@/components/expenseProgressBar';



interface Card {
    id: string | number;
    icon: string;
    title: string;
    description: string;
    date: string;
    amount: number;
}
type UserInfo = {
    name: string;
};


const CuteCards = () => {
    const { budget, fetchBudget, hasBudget } = useBudgetContext();
    const [showBudgetModal, setShowBudgetModal] = useState(false);
    const [cards, setCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [userInfo, setUserInfo] = useState<UserInfo>({
        name: '',
    });
    const [error, setError] = useState<string | null>(null);

    // const handleAddCard = () => {
    //     Alert.alert('💖 Adding a new cute item!', 'Functionality TBD');
    //     const newCard: Card = {
    //         id: Date.now(),
    //         icon: '🎉',
    //         title: 'New Card!',
    //         description: 'Just added via the magic button!',
    //     };
    //     setCards([...cards, newCard]);
    // };

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const res = await getProfile();
                // console.log(`Response`, res);
                const name = res.name;
                if (!name) {
                    throw new Error("User name not found in response");
                }
                setUserInfo({ name });
            } catch (error) {
                setError(`Error fetching user: ${(error as Error).message}`);
            }
        };

        fetchUserInfo();
    }, []);

    useEffect(() => {
        if (!budget) {
            setShowBudgetModal(true);
        }
    }
        , [budget]);

    const handleModalSuccess = async () => {
        await fetchBudget();
        setShowBudgetModal(false);
    };
    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'Food':
                return '🍔';
            case 'Entertainment':
                return '🎮';
            case 'Shopping':
                return '🛍️';
            case 'Transport':
                return '🚌';
            default:
                return '💸';
        }
    };

    const fetchCards = async () => {
        try {
            const response = await getExpensesByUser();
            const mappedCards: Card[] = response.map((item: any, index: number) => ({
                id: item._id,
                icon: getCategoryIcon(item.category),
                title: item.title,
                description: item.description,
                date: item.date,
                amount: item.amount,
            }));
            setCards(mappedCards);
        } catch (error) {
            console.error('Error fetching cards:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCards();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>
                        Hello, {userInfo.name} <Text style={styles.headerIcon}>🎀</Text>
                    </Text>
                    <Text style={styles.subheaderText}>Here's your spending summary:</Text>
                </View>

                {/* ✅ Show progress bar only if a budget exists */}
                {hasBudget && (
                    <ExpenseProgressBar onEditBudget={() => setShowBudgetModal(true)} />
                )}

                {/* ✅ Show budget action button
                <TouchableOpacity onPress={() => setShowBudgetModal(true)} style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: 16 }}>
                        {hasBudget ? 'Edit Budget ✏️' : 'Set Budget 💰'}
                    </Text>
                </TouchableOpacity> */}

                {/* ✅ Show modal for creating or editing the budget */}
                <BudgetModal
                    visible={showBudgetModal}
                    onClose={() => setShowBudgetModal(false)}
                    onSuccess={handleModalSuccess}
                    isEditing={hasBudget} // 👈 Pass editing flag dynamically
                />

                <View style={styles.cardGrid}>
                    {loading ? (
                        <Text style={styles.cardTitle}>Loading...</Text>) : (

                        cards.map((card: Card) => (
                            <Animated.View key={card.id} style={[styles.card, { opacity: 1, transform: [{ scale: 1 }] }]}>
                                <View style={styles.cardContent}>
                                    <Text style={styles.cardIcon}>{card.icon}</Text>

                                    <View style={styles.cardTextSection}>
                                        <Text style={styles.cardTitle}>{card.title}</Text>

                                        <View style={styles.cardMetaRow}>
                                            <Text style={styles.cardDate}>{card.date}</Text>
                                            <Text style={styles.loss}>{card.amount}$</Text>
                                        </View>

                                        <Text style={styles.cardDesc}>{card.description}</Text>
                                    </View>
                                </View>
                            </Animated.View>

                        ))
                    )}
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
                <MaterialIcons name="add" size={30} color="#fff" />
                <AddExpenseForm visible={modalVisible} onClose={() => setModalVisible(false)} onSuccess={fetchCards} />
            </TouchableOpacity>
        </View>
    );
};

export default CuteCards;

const styles = StyleSheet.create({
    cardMetaRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8, // keep same spacing as cardDate had
    },

    cardContent: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: '100%',
        gap: 10,
    },
    cardTextSection: {
        flex: 1,
        paddingLeft: 15,
    },
    cardDate: {
        fontStyle: 'italic',
        fontSize: 12,
        color: '#999',
    },
    profit: {
        color: '#4caf50',
        fontWeight: '500',
    },

    loss: {
        color: '#f44336',
        fontWeight: '500',
    },
    container: {
        flex: 1,
        backgroundColor: '#ffdde1',
        paddingBottom: 100,
    },
    scroll: {
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    headerText: {
        fontSize: 24,
        fontWeight: '600',
        color: '#ad1457',
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    subheaderText: {
        fontSize: 16,
        color: '#ad1457',
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
        marginTop: 5,
    },
    headerIcon: {
        fontSize: 26,
        marginLeft: 10,
    },
    cardGrid: {
        flexDirection: 'column',
        gap: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 25,
        borderWidth: 1,
        borderColor: '#fce4ec',
        shadowColor: '#ad1457',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 15,
        elevation: 5,
        alignItems: 'center',
    },
    cardIcon: {
        fontSize: 32,
        marginBottom: 15,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#ad1457',
        marginBottom: 5,
    },
    cardDesc: {
        fontSize: 14,
        color: '#ec407a',
        // textAlign: 'center',
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#e91e63',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#e91e63',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 6,
    },
});
