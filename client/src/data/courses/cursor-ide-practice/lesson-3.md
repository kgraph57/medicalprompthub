# レッスン3: 機械学習コードの生成とデバッグ - 医療AIモデルの構築

## 1. はじめに

医療AIモデルの構築は、診断支援、予測モデル、データ分析など、様々な目的で必要になります。本レッスンでは、Cursor IDEのAI機能を活用して、機械学習モデル構築のコードを効率的に生成し、デバッグする方法について詳しく学びます。

特に、scikit-learnを使用したモデル構築、データの前処理、学習と評価のコード生成方法を実践例を通じて理解します。

## 2. モデル構築のコード生成

### モデル指定からコードを生成

Cursor IDEのAI機能は、使用したいモデルを指定することで、モデル構築のコードを自動生成できます。

**基本的な使い方：**

1. **モデルを指定**: 使用したいモデルをコメントで指定
2. **データの前処理**: データの前処理方法も指定
3. **学習と評価**: 学習と評価のコードも生成

**実際の例：ロジスティック回帰モデルの構築**

```
プロンプト例：

# ロジスティック回帰モデルを構築する関数を作成してください
# - 訓練データ（X_train, y_train）とテストデータ（X_test, y_test）を引数として受け取る
# - scikit-learnを使用
# - モデルを学習し、テストデータで評価
# - 精度、再現率、特異度、AUCを計算
# - 混同行列も表示
# - 関数名は build_logistic_regression_model
def build_logistic_regression_model(X_train, y_train, X_test, y_test):
    pass
```

**生成されるコード例：**

```python
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, recall_score, precision_score, f1_score
from sklearn.metrics import roc_auc_score, confusion_matrix, classification_report

def build_logistic_regression_model(X_train, y_train, X_test, y_test):
    """
    ロジスティック回帰モデルを構築し、評価する
    
    Args:
        X_train: 訓練データの特徴量
        y_train: 訓練データのラベル
        X_test: テストデータの特徴量
        y_test: テストデータのラベル
        
    Returns:
        model: 学習済みモデル
        results: 評価結果（辞書形式）
    """
    # モデルの作成
    model = LogisticRegression(random_state=42, max_iter=1000)
    
    # モデルの学習
    print("モデルを学習しています...")
    model.fit(X_train, y_train)
    
    # 予測
    y_pred = model.predict(X_test)
    y_pred_proba = model.predict_proba(X_test)[:, 1]
    
    # 評価指標の計算
    accuracy = accuracy_score(y_test, y_pred)
    recall = recall_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)
    auc = roc_auc_score(y_test, y_pred_proba)
    
    # 混同行列
    cm = confusion_matrix(y_test, y_pred)
    
    # 結果の表示
    print("\n=== 評価結果 ===")
    print(f"精度 (Accuracy): {accuracy:.3f}")
    print(f"再現率 (Recall): {recall:.3f}")
    print(f"適合率 (Precision): {precision:.3f}")
    print(f"F1スコア: {f1:.3f}")
    print(f"AUC: {auc:.3f}")
    
    print("\n=== 混同行列 ===")
    print(cm)
    
    print("\n=== 分類レポート ===")
    print(classification_report(y_test, y_pred))
    
    # 結果を辞書形式で返す
    results = {
        'accuracy': accuracy,
        'recall': recall,
        'precision': precision,
        'f1_score': f1,
        'auc': auc,
        'confusion_matrix': cm
    }
    
    return model, results

# 使用例
# model, results = build_logistic_regression_model(X_train, y_train, X_test, y_test)
```

### ランダムフォレストモデルの構築

より複雑なモデルも、コメントからコードを生成できます。

**実際の例：ランダムフォレストモデルの構築**

```
プロンプト例：

# ランダムフォレストモデルを構築する関数を作成してください
# - 訓練データとテストデータを引数として受け取る
# - scikit-learnを使用
# - ハイパーパラメータのチューニング（グリッドサーチ）も含める
# - 最適なハイパーパラメータを見つけて、モデルを学習
# - 評価指標を計算
# - 特徴量の重要度も表示
# - 関数名は build_random_forest_model
def build_random_forest_model(X_train, y_train, X_test, y_test):
    pass
```

**生成されるコード例：**

```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import GridSearchCV

def build_random_forest_model(X_train, y_train, X_test, y_test):
    """
    ランダムフォレストモデルを構築し、評価する
    
    Args:
        X_train: 訓練データの特徴量
        y_train: 訓練データのラベル
        X_test: テストデータの特徴量
        y_test: テストデータのラベル
        
    Returns:
        model: 学習済みモデル
        results: 評価結果（辞書形式）
    """
    # ハイパーパラメータのグリッドサーチ
    param_grid = {
        'n_estimators': [100, 200, 300],
        'max_depth': [10, 20, 30, None],
        'min_samples_split': [2, 5, 10],
        'min_samples_leaf': [1, 2, 4]
    }
    
    # ベースモデル
    base_model = RandomForestClassifier(random_state=42)
    
    # グリッドサーチ
    print("ハイパーパラメータをチューニングしています...")
    grid_search = GridSearchCV(
        base_model, param_grid, cv=5, scoring='roc_auc', n_jobs=-1
    )
    grid_search.fit(X_train, y_train)
    
    # 最適なモデル
    best_model = grid_search.best_estimator_
    
    print(f"最適なハイパーパラメータ: {grid_search.best_params_}")
    print(f"最適なスコア: {grid_search.best_score_:.3f}")
    
    # 予測
    y_pred = best_model.predict(X_test)
    y_pred_proba = best_model.predict_proba(X_test)[:, 1]
    
    # 評価指標の計算
    accuracy = accuracy_score(y_test, y_pred)
    recall = recall_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)
    auc = roc_auc_score(y_test, y_pred_proba)
    
    # 特徴量の重要度
    feature_importance = pd.DataFrame({
        'feature': X_train.columns,
        'importance': best_model.feature_importances_
    }).sort_values('importance', ascending=False)
    
    # 結果の表示
    print("\n=== 評価結果 ===")
    print(f"精度 (Accuracy): {accuracy:.3f}")
    print(f"再現率 (Recall): {recall:.3f}")
    print(f"適合率 (Precision): {precision:.3f}")
    print(f"F1スコア: {f1:.3f}")
    print(f"AUC: {auc:.3f}")
    
    print("\n=== 特徴量の重要度（上位10） ===")
    print(feature_importance.head(10))
    
    # 結果を辞書形式で返す
    results = {
        'accuracy': accuracy,
        'recall': recall,
        'precision': precision,
        'f1_score': f1,
        'auc': auc,
        'best_params': grid_search.best_params_,
        'feature_importance': feature_importance
    }
    
    return best_model, results
```

## 3. データ前処理パイプラインの構築

### 前処理パイプラインのコード生成

機械学習では、データの前処理が重要です。前処理パイプラインのコードも生成できます。

**実際の例：医療データの前処理パイプライン**

```
プロンプト例：

# 医療データの前処理パイプラインを作成してください
# - 患者データ（DataFrame）と特徴量の列名リストを引数として受け取る
# - 前処理のステップ：
#   1. 欠損値の処理（平均値で補完）
#   2. カテゴリ変数のエンコーディング（One-Hot Encoding）
#   3. 数値変数の標準化（StandardScaler）
# - scikit-learnのPipelineを使用
# - 前処理後のデータを返す
# - 関数名は preprocess_medical_data
def preprocess_medical_data(data, feature_columns):
    pass
```

**生成されるコード例：**

```python
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer

def preprocess_medical_data(data, feature_columns, target_column=None):
    """
    医療データの前処理パイプラインを実行する
    
    Args:
        data: 患者データ（pandas.DataFrame）
        feature_columns: 特徴量の列名リスト
        target_column: ターゲット変数の列名（オプション）
        
    Returns:
        X: 前処理後の特徴量
        y: ターゲット変数（target_columnが指定された場合）
    """
    # 特徴量の抽出
    X = data[feature_columns].copy()
    
    # ターゲット変数の抽出
    if target_column:
        y = data[target_column].copy()
    else:
        y = None
    
    # 数値列とカテゴリ列の識別
    numeric_columns = X.select_dtypes(include=[np.number]).columns.tolist()
    categorical_columns = X.select_dtypes(include=['object']).columns.tolist()
    
    # 前処理パイプラインの作成
    numeric_transformer = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='mean')),
        ('scaler', StandardScaler())
    ])
    
    categorical_transformer = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='most_frequent')),
        ('onehot', OneHotEncoder(drop='first', sparse=False, handle_unknown='ignore'))
    ])
    
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', numeric_transformer, numeric_columns),
            ('cat', categorical_transformer, categorical_columns)
        ]
    )
    
    # 前処理の実行
    print("データを前処理しています...")
    X_processed = preprocessor.fit_transform(X)
    
    # 特徴量名の取得（One-Hot Encoding後の列名）
    feature_names = numeric_columns.copy()
    if categorical_columns:
        ohe = categorical_transformer.named_steps['onehot']
        ohe_feature_names = ohe.get_feature_names_out(categorical_columns)
        feature_names.extend(ohe_feature_names)
    
    X_processed = pd.DataFrame(X_processed, columns=feature_names)
    
    print(f"前処理完了: {X_processed.shape[0]}行, {X_processed.shape[1]}特徴量")
    
    if y is not None:
        return X_processed, y
    else:
        return X_processed
```

## 4. デバッグ支援

### エラー検出と修正提案

Cursor IDEのAI機能は、コードのエラーを検出し、修正方法を提案できます。

**エラー検出の例：**

```python
# エラーがあるコード
def calculate_statistics(data, columns):
    results = []
    for column in columns:
        stats = {
            '列名': column,
            '平均値': data[column].mean(),  # エラー：data[column]が存在しない可能性
            '標準偏差': data[column].std()
        }
        results.append(stats)
    return pd.DataFrame(results)
```

**AIによる修正提案：**

```
エラーが検出されました。

問題：data[column]が存在しない可能性があります。

修正提案：
1. 列の存在確認を追加
2. エラーハンドリングを追加

修正後のコード：
```

**生成される修正コード例：**

```python
def calculate_statistics(data, columns):
    results = []
    for column in columns:
        if column not in data.columns:
            raise ValueError(f"列 '{column}' が存在しません")
        
        col_data = data[column].dropna()  # 欠損値の除外
        
        if len(col_data) == 0:
            continue  # データがない場合はスキップ
        
        stats = {
            '列名': column,
            '平均値': col_data.mean(),
            '標準偏差': col_data.std()
        }
        results.append(stats)
    return pd.DataFrame(results)
```

### コードの説明

Cursor IDEのAI機能は、コードの説明も提供できます。

**コード説明の例：**

```
プロンプト例：

# 以下のコードを説明してください。日本語で、わかりやすく説明してください。

[コードを貼り付け]
```

**AIによる説明例：**

```
このコードは、患者データの基本統計量を計算する関数です。

処理の流れ：
1. 結果を格納するリストを初期化
2. 各列についてループ処理：
   - 列の存在確認
   - 欠損値を除外
   - データが存在する場合、統計量を計算
3. 結果をDataFrame形式で返す

エラーハンドリング：
- 列が存在しない場合、エラーメッセージを表示
- データがない場合、その列をスキップ
```

## 5. 実践的なワークフロー

### 機械学習プロジェクトの構築

複数の処理を組み合わせて、機械学習プロジェクトを構築できます。

**実際の例：医療データ分類プロジェクト**

```
プロンプト例：

# 医療データ分類プロジェクトを作成してください
# 1. CSVファイルからデータを読み込む
# 2. データを前処理（欠損値処理、エンコーディング、標準化）
# 3. データを訓練データとテストデータに分割
# 4. ランダムフォレストモデルを構築
# 5. モデルを評価
# 6. 結果を可視化（混同行列、ROC曲線）
# 7. モデルを保存

# すべての処理を1つの関数で実行できるようにしてください
# 関数名は build_classification_model
def build_classification_model(input_file, target_column, feature_columns):
    pass
```

**生成されるコード例：**

```python
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_curve, auc
import matplotlib.pyplot as plt
import joblib

def build_classification_model(input_file, target_column, feature_columns):
    """
    医療データ分類モデルを構築する
    
    Args:
        input_file: 入力CSVファイルのパス
        target_column: ターゲット変数の列名
        feature_columns: 特徴量の列名リスト
    """
    # 1. データの読み込み
    print("データを読み込んでいます...")
    data = load_patient_data(input_file)
    
    # 2. データの前処理
    print("データを前処理しています...")
    X, y = preprocess_medical_data(data, feature_columns, target_column)
    
    # 3. データの分割
    print("データを分割しています...")
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    # 4. モデルの構築
    print("モデルを構築しています...")
    model, results = build_random_forest_model(X_train, y_train, X_test, y_test)
    
    # 5. 結果の可視化
    print("結果を可視化しています...")
    
    # 混同行列の可視化
    fig, axes = plt.subplots(1, 2, figsize=(12, 5))
    
    # 混同行列
    cm = results['confusion_matrix']
    axes[0].imshow(cm, interpolation='nearest', cmap=plt.cm.Blues)
    axes[0].set_title('混同行列')
    axes[0].set_ylabel('真の値')
    axes[0].set_xlabel('予測値')
    
    # ROC曲線
    y_pred_proba = model.predict_proba(X_test)[:, 1]
    fpr, tpr, thresholds = roc_curve(y_test, y_pred_proba)
    roc_auc = auc(fpr, tpr)
    
    axes[1].plot(fpr, tpr, color='darkorange', lw=2, label=f'ROC曲線 (AUC = {roc_auc:.2f})')
    axes[1].plot([0, 1], [0, 1], color='navy', lw=2, linestyle='--')
    axes[1].set_xlim([0.0, 1.0])
    axes[1].set_ylim([0.0, 1.05])
    axes[1].set_xlabel('偽陽性率')
    axes[1].set_ylabel('真陽性率')
    axes[1].set_title('ROC曲線')
    axes[1].legend(loc="lower right")
    
    plt.tight_layout()
    plt.savefig('model_evaluation.png', dpi=300, bbox_inches='tight')
    plt.close()
    
    # 6. モデルの保存
    model_file = 'classification_model.pkl'
    joblib.dump(model, model_file)
    print(f"モデルを保存しました: {model_file}")
    
    print("\n=== プロジェクト完了 ===")
    return model, results

# 使用例
# feature_columns = ['age', 'gender', 'glucose', 'hba1c']
# model, results = build_classification_model('patient_data.csv', 'diabetes', feature_columns)
```

## 6. まとめ

本レッスンでは、機械学習コードの生成とデバッグについて学びました。モデル構築のコード生成、データ前処理パイプラインの構築、デバッグ支援、実践的なワークフローなどの実践例を通じて、効率的なコード生成方法を理解しました。

Cursor IDEのAI機能を適切に活用することで、機械学習モデルの構築を効率化できます。特に、コメントで明確に意図を記述することで、より適切なコードが生成されます。

次のレッスンでは、効果的なプロンプトの書き方について詳しく学びます。より高品質なコードを生成するためのプロンプトテクニックを理解していきましょう。

---

### 参考資料

- [Scikit-learn Documentation](https://scikit-learn.org/stable/): scikit-learnの公式ドキュメント
- [Machine Learning Best Practices](https://scikit-learn.org/stable/modules/cross_validation.html): 機械学習のベストプラクティス
- [Cursor IDE Documentation](https://cursor.sh/docs): Cursor IDEの公式ドキュメント
