import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, Button, Alert, ScrollView } from 'react-native';
import { getAllPosts, createPost, deletePostApi } from './api';

export default function Home({ user, onNavigateToProfile }) {
  const [posts, setPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSub, setNewSub] = useState('');

  const [detailPost, setDetailPost] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await getAllPosts();
      setPosts(data);
    } catch (error) {
      console.error('Failed to load posts:', error);
      Alert.alert('Lỗi', 'Không thể tải bài đăng');
    }
  };

  const handleShowDetail = (post) => {
    setDetailPost(post);
    setDetailModalVisible(true);
  };

  const handleAddPost = async () => {
    if (!newTitle || !newSub) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }
    try {
      await createPost({
        title: newTitle,
        description: newSub,
        creator_email: user?.email || 'anonymous'
      });
      setNewTitle('');
      setNewSub('');
      setModalVisible(false);
      loadPosts();
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể thêm bài đăng');
    }
  };

  const handleDeletePost = async (id) => {
    Alert.alert('Xóa bài đăng', 'Bạn có chắc chắn muốn xóa bài đăng này?', [
      { text: 'Hủy', style: 'cancel' },
      { 
        text: 'Xóa', 
        style: 'destructive',
        onPress: async () => {
          try {
            await deletePostApi(id);
            loadPosts();
            if (detailPost?.id === id) setDetailModalVisible(false);
          } catch (error) {
            Alert.alert('Lỗi', 'Không thể xóa bài đăng');
          }
        }
      }
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fcfcfc', paddingTop: 50 }}>
      {/* Header */}
      <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, color: '#666' }}>Chào bạn,</Text>
          <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#1a1a1a' }}>{user?.name || 'Bạn'} 👋</Text>
        </View>
        {/* Profile Avatar (Static) */}
        <View style={{ width: 45, height: 45, borderRadius: 22.5, backgroundColor: '#f0f7ff', borderWidth: 1, borderColor: '#e0e7ff', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 22 }}>👤</Text>
        </View>
      </View>

      <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: '700', color: '#334155' }}>Bài đăng của bạn ({posts.length})</Text>
        <TouchableOpacity 
          onPress={() => setModalVisible(true)}
          style={{ backgroundColor: '#10b981', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8, elevation: 2 }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>+ Thêm</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => handleShowDetail(item)}
            style={{ marginHorizontal: 20, marginBottom: 15, padding: 16, backgroundColor: 'white', borderRadius: 12, borderWidth: 1, borderColor: '#f1f5f9', elevation: 1 }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', flex: 1, color: '#1e293b' }}>{item.title}</Text>
              <TouchableOpacity onPress={() => handleDeletePost(item.id)} style={{ padding: 5 }}>
                <Text style={{ color: '#cbd5e1', fontSize: 20 }}>×</Text>
              </TouchableOpacity>
            </View>
            <Text numberOfLines={2} style={{ color: '#64748b', marginTop: 6, lineHeight: 20 }}>{item.description}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, alignItems: 'center' }}>
                <Text style={{ color: '#94a3b8', fontSize: 12 }}>🕒 {item.created_at || 'Mới đây'}</Text>
                <Text style={{ color: '#60a5fa', fontSize: 12, fontWeight: '600' }}>Chi tiết →</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Add Modal */}
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <View style={{ width: '85%', backgroundColor: 'white', padding: 24, borderRadius: 16, elevation: 5 }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#1e293b' }}>Thêm bài đăng mới</Text>
            <TextInput
              placeholder="Tiêu đề bài viết"
              placeholderTextColor="#94a3b8"
              style={{ borderWidth: 1, borderColor: '#e2e8f0', padding: 12, borderRadius: 10, marginBottom: 15, fontSize: 16 }}
              value={newTitle}
              onChangeText={setNewTitle}
            />
            <TextInput
              placeholder="Bạn đang nghĩ gì?"
              placeholderTextColor="#94a3b8"
              style={{ borderWidth: 1, borderColor: '#e2e8f0', padding: 12, borderRadius: 10, marginBottom: 25, fontSize: 16, height: 100, textAlignVertical: 'top' }}
              value={newSub}
              onChangeText={setNewSub}
              multiline
            />
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 12 }}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
                <Text style={{ color: '#64748b', fontWeight: '600' }}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAddPost} style={{ backgroundColor: '#10b981', paddingVertical: 10, paddingHorizontal: 24, borderRadius: 10 }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Đăng bài</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Detail Modal */}
      <Modal visible={detailModalVisible} animationType="slide" transparent={true}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 24, paddingBottom: 100, height: '85%' }}>
            <View style={{ width: 40, height: 4, backgroundColor: '#e2e8f0', borderRadius: 2, alignSelf: 'center', marginBottom: 20 }} />
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#1e293b' }}>{detailPost?.title}</Text>
                    <Text style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>Đăng bởi: {detailPost?.creator_email}</Text>
                </View>
                <TouchableOpacity onPress={() => setDetailModalVisible(false)} style={{ backgroundColor: '#f1f5f9', width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#64748b', fontWeight: 'bold' }}>×</Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, lineHeight: 26, color: '#334155' }}>
                    {detailPost?.description}
                </Text>
            </ScrollView>

            <View style={{ marginTop: 20, paddingTop: 20, borderTopWidth: 1, borderTopColor: '#f1f5f9', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ color: '#94a3b8', fontSize: 13 }}>🕒 {detailPost?.created_at}</Text>
                <TouchableOpacity 
                    onPress={() => handleDeletePost(detailPost?.id)}
                    style={{ backgroundColor: '#fef2f2', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 }}
                >
                    <Text style={{ color: '#ef4444', fontWeight: '600' }}>Xóa bài</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
