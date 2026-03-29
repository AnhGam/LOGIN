import * as SQLite from 'expo-sqlite';

const DATABASE_NAME = 'main.db';

let _db = null;

export async function getDatabase() {
  if (_db) return _db;
  console.log('Opening database...');
  try {
    _db = await SQLite.openDatabaseAsync(DATABASE_NAME);
    console.log('Database opened successfully');
    return _db;
  } catch (error) {
    console.error('Failed to open database:', error);
    throw error;
  }
}

export async function initDatabase() {
  console.log('Initializing database...');
  const db = await getDatabase();
  
  try {
    // Separate PRAGMA and CREATE TABLE to be safe
    await db.execAsync('PRAGMA journal_mode = WAL;');
    
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        sub TEXT NOT NULL,
        created_at TEXT DEFAULT current_timestamp
      );
    `);
    console.log('Main table created or already exists');

    // Check if initial data is needed
    const posts = await db.getAllAsync('SELECT * FROM posts LIMIT 1;');
    if (posts.length === 0) {
      console.log('Seeding initial data...');
      const initialData = [
        { title: 'Học về React Native', sub: 'Một framework rất hay để làm app di động.' },
        { title: 'Tại sao nên dùng Expo?', sub: 'Giúp mọi thứ trở nên nhanh chóng và tiện lợi.' },
        { title: 'Chia sẻ kiến thức', sub: 'Hãy cùng nhau học tập mỗi ngày nhé.' },
        { title: 'Kinh nghiệm code', sub: 'Luôn giữ mọi thứ đơn giản nhất có thể.' },
        { title: 'Dự án đầu tay', sub: 'Đây là app đầu tiên tôi đang hoàn thiện.' },
      ];
      
      for (const post of initialData) {
        await db.runAsync('INSERT INTO posts (title, sub) VALUES (?, ?);', [post.title, post.sub]);
      }
      console.log('Seeded initial posts database');
    }
  } catch (error) {
    console.error('Database initialization failed:', error);
  }
}

export async function getPosts() {
  const db = await getDatabase();
  return await db.getAllAsync('SELECT * FROM posts ORDER BY id DESC;');
}

export async function addPost(title, sub) {
  const db = await getDatabase();
  const result = await db.runAsync('INSERT INTO posts (title, sub) VALUES (?, ?);', [title, sub]);
  return result.lastInsertRowId;
}

export async function deletePost(id) {
  const db = await getDatabase();
  await db.runAsync('DELETE FROM posts WHERE id = ?;', [id]);
}
