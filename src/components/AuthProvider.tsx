"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

interface AuthContextValue {
  /** 현재 로그인한 사용자 정보 (로그아웃 상태이면 null) */
  user: User | null;
  /** 처음 로그인 상태를 확인하는 중인지 여부 */
  loading: boolean;
  /** 로그아웃 실행 함수 */
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  signOut: async () => {},
});

// 앱 어디서나 로그인 상태를 공유하고 변경을 감지하는 Provider입니다
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. 페이지가 열릴 때 현재 로그인 세션을 한 번 확인합니다
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    // 2. 로그인/로그아웃 상태가 바뀔 때마다 화면 상태를 즉시 업데이트합니다
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // 로그아웃 버튼을 눌렀을 때 Supabase 세션을 종료합니다
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// 하위 컴포넌트에서 user, loading, signOut을 꺼내 쓰는 훅입니다
export function useAuth() {
  return useContext(AuthContext);
}
