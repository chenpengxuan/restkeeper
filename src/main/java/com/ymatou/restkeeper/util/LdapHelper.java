/*
 *
 *  (C) Copyright 2016 Ymatou (http://www.ymatou.com/).
 *  All rights reserved.
 *
 */

package com.ymatou.restkeeper.util;

/**
 * @author luoshiqian 2016/8/1 16:01
 */
import com.sun.org.apache.xerces.internal.impl.dv.util.Base64;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Hashtable;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.naming.Context;
import javax.naming.NamingEnumeration;
import javax.naming.NamingException;
import javax.naming.directory.*;


public class LdapHelper {

    private static DirContext ctx;

    @SuppressWarnings(value = "unchecked")
    public static DirContext getCtx() {
//        if (ctx != null ) {
//            return ctx;
//        }
//        String account = "Manager"; //binddn
//        String password = "pwd";    //bindpwd
//        String root = "CN=ymt-ad-01,DC=ymt,DC=corp"; // root
        Hashtable env = new Hashtable();
        env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
        env.put(Context.PROVIDER_URL, "ldap://ymt-ad-01.ymt.corp");
        env.put(Context.SECURITY_AUTHENTICATION, "simple");
//        env.put(Context.SECURITY_AUTHENTICATION, "simple");
//        env.put(Context.SECURITY_PRINCIPAL, "luoshiqian" );
//        env.put(Context.SECURITY_CREDENTIALS, "Loushi135");
        try {
            // 链接ldap
            ctx = new InitialDirContext(env);
            System.out.println("认证成功");
        } catch (javax.naming.AuthenticationException e) {
            System.out.println("认证出错：");
        } catch (Exception e) {
            System.out.println("认证出错：");
            e.printStackTrace();
        }
        return ctx;
    }

    public static void closeCtx(){
        try {
            ctx.close();
        } catch (NamingException ex) {
            Logger.getLogger(LdapHelper.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @SuppressWarnings(value = "unchecked")
    public static boolean verifySHA(String ldappw, String inputpw)
            throws NoSuchAlgorithmException {

        // MessageDigest 提供了消息摘要算法，如 MD5 或 SHA，的功能，这里LDAP使用的是SHA-1
        MessageDigest md = MessageDigest.getInstance("SHA-1");

        // 取出加密字符
        if (ldappw.startsWith("{SSHA}")) {
            ldappw = ldappw.substring(6);
        } else if (ldappw.startsWith("{SHA}")) {
            ldappw = ldappw.substring(5);
        }

        // 解码BASE64
        byte[] ldappwbyte = Base64.decode(ldappw);
        byte[] shacode;
        byte[] salt;

        // 前20位是SHA-1加密段，20位后是最初加密时的随机明文
        if (ldappwbyte.length <= 20) {
            shacode = ldappwbyte;
            salt = new byte[0];
        } else {
            shacode = new byte[20];
            salt = new byte[ldappwbyte.length - 20];
            System.arraycopy(ldappwbyte, 0, shacode, 0, 20);
            System.arraycopy(ldappwbyte, 20, salt, 0, salt.length);
        }

        // 把用户输入的密码添加到摘要计算信息
        md.update(inputpw.getBytes());
        // 把随机明文添加到摘要计算信息
        md.update(salt);

        // 按SSHA把当前用户密码进行计算
        byte[] inputpwbyte = md.digest();

        // 返回校验结果
        return MessageDigest.isEqual(shacode, inputpwbyte);
    }


    public static boolean authenticate(String usr, String pwd) {
        boolean success = false;
        DirContext ctx = null;
        try {
            ctx = LdapHelper.getCtx();
            SearchControls constraints = new SearchControls();
            constraints.setSearchScope(SearchControls.SUBTREE_SCOPE);
//             constraints.setSearchScope(SearchControls.ONELEVEL_SCOPE);
            NamingEnumeration en = ctx.search("OU=ymatou,DC=ymt,DC=corp", "(objectClass=*)",
                    new Object[] {"SamAccountName", "DisplayName", "UserPrincipalName"}, constraints); // 查询所有用户
            while (en != null && en.hasMoreElements()) {
                Object obj = en.nextElement();
                if (obj instanceof SearchResult) {
                    SearchResult si = (SearchResult) obj;
                    System.out.println("name:   " + si.getName());
                    Attributes attrs = si.getAttributes();
                    if (attrs == null) {
                        System.out.println("No   attributes");
                    } else {
                        Attribute attr = attrs.get("userPassword");
                        Object o = attr.get();
                        byte[] s = (byte[]) o;
                        String pwd2 = new String(s);
                        success = LdapHelper.verifySHA(pwd2, pwd);
                        return success;
                    }
                } else {
                    System.out.println(obj);
                }
                System.out.println();
            }
            ctx.close();
        } catch (NoSuchAlgorithmException ex) {
            try {
                if (ctx != null) {
                    ctx.close();
                }
            } catch (NamingException namingException) {
                namingException.printStackTrace();
            }
        } catch (NamingException ex) {
            try {
                if (ctx != null) {
                    ctx.close();
                }
                Logger.getLogger(LdapHelper.class.getName()).log(Level.SEVERE, null, ex);
            } catch (NamingException namingException) {
                namingException.printStackTrace();
            }
        }
        return false;
    }

    public static void main(String[] args) {
//        getCtx();
        System.out.println(authenticate("luoshiqian","Loushi135"));
    }

}
