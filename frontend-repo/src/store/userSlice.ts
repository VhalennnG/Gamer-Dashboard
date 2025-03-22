// src/store/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/interfaces/user';
import { fetchAllUsersApi, fetchUserDetailsApi, updateUserDataApi } from '@/apis/userApi';

interface UserState {
  usersList: User[] | null;
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
  updateStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: UserState = {
  usersList: null,
  selectedUser: null,
  loading: false,
  error: null,
  updateStatus: 'idle',
};

export const fetchAllUsers = createAsyncThunk(
  'user/fetchAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchAllUsersApi();
      return response.data.users;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch users');
    }
  }
);

export const fetchUserDetails = createAsyncThunk(
  'user/fetchUserDetails',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await fetchUserDetailsApi(userId);
      return response.data.user;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch user details');
    }
  }
);

export const updateUserData = createAsyncThunk(
  'user/updateUserData',
  async ({ userId, userData }: { userId: string, userData: Partial<User> }, { rejectWithValue }) => {
    try {
      const response = await updateUserDataApi(userId, userData);
      return response.data.user;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update user data');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUpdateStatus: (state) => {
      state.updateStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchAllUsers
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.usersList = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Handle fetchUserDetails
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Handle updateUserData
      .addCase(updateUserData.pending, (state) => {
        state.updateStatus = 'loading';
      })
      .addCase(updateUserData.fulfilled, (state, action: PayloadAction<User>) => {
        state.updateStatus = 'succeeded';
        state.selectedUser = action.payload;
        
        // Also update the user in the users list
        if (state.usersList) {
          state.usersList = state.usersList.map(user => 
            user.id === action.payload.id ? action.payload : user
          );
        }
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.updateStatus = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { resetUpdateStatus } = userSlice.actions;
export default userSlice.reducer;