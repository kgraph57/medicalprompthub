# レッスン2: 医療データ処理での活用 - 効率的なコード生成

## 1. はじめに

医療データ処理は、診療、研究、データ分析など、様々な場面で必要になります。本レッスンでは、GitHub Copilotを使って医療データ処理のコードを効率的に生成する方法について詳しく学びます。

特に、CSVファイルの読み込み、データの前処理、統計計算など、医療現場でよく行う作業のコード生成方法を実践例を通じて理解します。

## 2. データ読み込みのコード生成

### CSVファイルの読み込み

GitHub Copilotを使って、CSVファイル読み込みのコードを自動生成できます。

**基本的な使い方：**

1. **コメントを記述**: 「CSVファイルを読み込む」とコメントを書く
2. **コード生成**: GitHub Copilotがコードを提案
3. **確認と調整**: 生成されたコードを確認し、必要に応じて調整

**実際の例：CSVファイルの読み込み**

```
コメント例：

# 患者データをCSVファイルから読み込む関数を作成
# - ファイルパスを引数として受け取る
# - pandasを使用してCSVを読み込む
# - エラーハンドリングを含める（ファイルが存在しない場合など）
def load_patient_data(file_path):
```

**GitHub Copilotが生成するコード：**

```python
import pandas as pd
import os

def load_patient_data(file_path):
    """
    患者データをCSVファイルから読み込む
    
    Args:
        file_path: CSVファイルのパス
        
    Returns:
        pandas.DataFrame: 患者データ
    """
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"ファイルが見つかりません: {file_path}")
    
    try:
        data = pd.read_csv(file_path, encoding='utf-8')
        return data
    except Exception as e:
        raise ValueError(f"データの読み込みに失敗しました: {str(e)}")
```

### 医療データの読み込み例

医療現場でよく使用されるデータ形式に対応したコードを生成できます。

**実際の例：検査結果の読み込み**

```
コメント例：

# 検査結果をCSVファイルから読み込む関数を作成
# - ファイルパスを引数として受け取る
# - 医療データなので、文字コードはshift_jisまたはutf-8に対応
# - 日付列は自動的にdatetime型に変換
# - エラーハンドリングを含める
def load_lab_results(file_path):
```

**GitHub Copilotが生成するコード：**

```python
import pandas as pd
import os

def load_lab_results(file_path):
    """
    検査結果をCSVファイルから読み込む
    
    Args:
        file_path: CSVファイルのパス
        
    Returns:
        pandas.DataFrame: 検査結果データ
    """
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"ファイルが見つかりません: {file_path}")
    
    encodings = ['utf-8', 'shift_jis', 'cp932']
    data = None
    
    for encoding in encodings:
        try:
            data = pd.read_csv(file_path, encoding=encoding)
            break
        except UnicodeDecodeError:
            continue
    
    if data is None:
        raise ValueError("文字コードが判別できませんでした")
    
    # 日付列をdatetime型に変換
    date_columns = ['date', '検査日', 'Date']
    for col in date_columns:
        if col in data.columns:
            data[col] = pd.to_datetime(data[col], errors='coerce')
    
    return data
```

## 3. データ処理のコード生成

### データフィルタリング

GitHub Copilotを使って、データフィルタリングのコードを生成できます。

**実際の例：異常値の抽出**

```
コメント例：

# 検査結果から異常値を抽出する関数を作成
# - データフレームと検査項目名を引数として受け取る
# - 正常値の範囲を定義（例：血糖値は70-100 mg/dL）
# - 正常値から外れた値を抽出
# - 異常値の件数も返す
def extract_abnormal_values(data, column_name, lower_bound, upper_bound):
```

**GitHub Copilotが生成するコード：**

```python
def extract_abnormal_values(data, column_name, lower_bound, upper_bound):
    """
    検査結果から異常値を抽出する
    
    Args:
        data: 検査結果データ（pandas.DataFrame）
        column_name: 検査項目名
        lower_bound: 正常値の下限
        upper_bound: 正常値の上限
        
    Returns:
        pandas.DataFrame: 異常値のデータ
        int: 異常値の件数
    """
    if column_name not in data.columns:
        raise ValueError(f"列 '{column_name}' が存在しません")
    
    # 異常値を抽出
    abnormal_data = data[
        (data[column_name] < lower_bound) | (data[column_name] > upper_bound)
    ].copy()
    
    abnormal_count = len(abnormal_data)
    
    return abnormal_data, abnormal_count

# 使用例
# abnormal_data, count = extract_abnormal_values(data, 'glucose', 70, 100)
```

### 特定疾患の患者抽出

特定の疾患を持つ患者を抽出するコードも生成できます。

**実際の例：特定疾患の患者抽出**

```
コメント例：

# 特定の疾患を持つ患者を抽出する関数を作成
# - データフレームと診断名を引数として受け取る
# - 診断名の列から指定された疾患名を検索
# - 部分一致でも検索できるようにする
# - 抽出された患者データを返す
def filter_patients_by_diagnosis(data, diagnosis_name):
```

**GitHub Copilotが生成するコード：**

```python
def filter_patients_by_diagnosis(data, diagnosis_name):
    """
    特定の疾患を持つ患者を抽出する
    
    Args:
        data: 患者データ（pandas.DataFrame）
        diagnosis_name: 診断名
        
    Returns:
        pandas.DataFrame: 抽出された患者データ
    """
    # 診断名の列を探す
    diagnosis_columns = ['診断名', '診断', 'diagnosis', 'Diagnosis']
    diagnosis_col = None
    
    for col in diagnosis_columns:
        if col in data.columns:
            diagnosis_col = col
            break
    
    if diagnosis_col is None:
        raise ValueError("診断名の列が見つかりませんでした")
    
    # 部分一致で検索
    filtered_data = data[
        data[diagnosis_col].str.contains(diagnosis_name, case=False, na=False)
    ].copy()
    
    return filtered_data

# 使用例
# diabetes_patients = filter_patients_by_diagnosis(data, '糖尿病')
```

### 統計計算

基本的な統計計算のコードも生成できます。

**実際の例：基本統計量の計算**

```
コメント例：

# 検査結果の基本統計量を計算する関数を作成
# - データフレームと計算する列名のリストを引数として受け取る
# - 平均値、標準偏差、最小値、最大値、中央値を計算
# - 結果をDataFrame形式で返す
def calculate_statistics(data, columns):
```

**GitHub Copilotが生成するコード：**

```python
import pandas as pd
import numpy as np

def calculate_statistics(data, columns):
    """
    検査結果の基本統計量を計算する
    
    Args:
        data: 検査結果データ（pandas.DataFrame）
        columns: 計算する列名のリスト
        
    Returns:
        pandas.DataFrame: 統計量の結果
    """
    results = []
    
    for column in columns:
        if column not in data.columns:
            raise ValueError(f"列 '{column}' が存在しません")
        
        col_data = data[column].dropna()
        
        if len(col_data) == 0:
            continue
        
        stats = {
            '列名': column,
            '平均値': col_data.mean(),
            '標準偏差': col_data.std(),
            '最小値': col_data.min(),
            '最大値': col_data.max(),
            '中央値': col_data.median(),
            'サンプル数': len(col_data)
        }
        results.append(stats)
    
    return pd.DataFrame(results)

# 使用例
# columns = ['glucose', 'hba1c', 'crp']
# stats = calculate_statistics(data, columns)
```

## 4. データ前処理のコード生成

### 欠損値処理

欠損値処理のコードも生成できます。

**実際の例：欠損値の処理**

```
コメント例：

# データフレームの欠損値を処理する関数を作成
# - データフレームと処理方法を引数として受け取る
# - 処理方法の例：
#   - 'drop': 欠損値のある行を削除
#   - 'mean': 平均値で補完（数値列のみ）
#   - 'median': 中央値で補完（数値列のみ）
#   - 'forward': 前の値で補完
def handle_missing_values(data, method='drop'):
```

**GitHub Copilotが生成するコード：**

```python
def handle_missing_values(data, method='drop'):
    """
    データフレームの欠損値を処理する
    
    Args:
        data: データフレーム
        method: 処理方法
            - 'drop': 欠損値のある行を削除
            - 'mean': 平均値で補完（数値列のみ）
            - 'median': 中央値で補完（数値列のみ）
            - 'forward': 前の値で補完
        
    Returns:
        pandas.DataFrame: 処理後のデータフレーム
    """
    processed_data = data.copy()
    
    if method == 'drop':
        processed_data = processed_data.dropna()
    elif method == 'mean':
        numeric_columns = processed_data.select_dtypes(include=[np.number]).columns
        processed_data[numeric_columns] = processed_data[numeric_columns].fillna(
            processed_data[numeric_columns].mean()
        )
    elif method == 'median':
        numeric_columns = processed_data.select_dtypes(include=[np.number]).columns
        processed_data[numeric_columns] = processed_data[numeric_columns].fillna(
            processed_data[numeric_columns].median()
        )
    elif method == 'forward':
        processed_data = processed_data.fillna(method='ffill')
    else:
        raise ValueError(f"未知の処理方法: {method}")
    
    return processed_data

# 使用例
# processed_data = handle_missing_values(data, method='mean')
```

### 異常値処理

異常値処理のコードも生成できます。

**実際の例：異常値の検出と処理**

```
コメント例：

# データフレームから異常値を検出し、処理する関数を作成
# - データフレームと列名を引数として受け取る
# - 異常値の検出方法：IQR（四分位範囲）を使用
# - 異常値を外れ値として検出
# - 処理方法の選択：
#   - 'remove': 異常値を削除
#   - 'clip': 異常値を範囲内にクリップ
def handle_outliers(data, column, method='remove'):
```

**GitHub Copilotが生成するコード：**

```python
def handle_outliers(data, column, method='remove'):
    """
    データフレームから異常値を検出し、処理する
    
    Args:
        data: データフレーム
        column: 対象の列名
        method: 処理方法
            - 'remove': 異常値を削除
            - 'clip': 異常値を範囲内にクリップ
        
    Returns:
        pandas.DataFrame: 処理後のデータフレーム
    """
    if column not in data.columns:
        raise ValueError(f"列 '{column}' が存在しません")
    
    col_data = data[column].dropna()
    
    # IQR法で異常値を検出
    Q1 = col_data.quantile(0.25)
    Q3 = col_data.quantile(0.75)
    IQR = Q3 - Q1
    
    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR
    
    processed_data = data.copy()
    
    if method == 'remove':
        # 異常値を削除
        processed_data = processed_data[
            (processed_data[column] >= lower_bound) &
            (processed_data[column] <= upper_bound)
        ]
    elif method == 'clip':
        # 異常値を範囲内にクリップ
        processed_data[column] = processed_data[column].clip(
            lower=lower_bound, upper=upper_bound
        )
    else:
        raise ValueError(f"未知の処理方法: {method}")
    
    return processed_data

# 使用例
# processed_data = handle_outliers(data, column='glucose', method='clip')
```

## 5. 実践的なワークフロー

### データ処理パイプラインの構築

複数の処理を組み合わせて、データ処理パイプラインを構築できます。

**実際の例：医療データ処理パイプライン**

```
コメント例：

# 医療データ処理パイプラインを作成
# 1. CSVファイルからデータを読み込む
# 2. 欠損値を平均値で補完
# 3. 異常値をクリップ
# 4. 特定の条件でフィルタリング（年齢50歳以上）
# 5. 基本統計量を計算
# 6. 結果をCSVファイルに保存
def process_medical_data(input_file, output_file):
```

**GitHub Copilotが生成するコード：**

```python
def process_medical_data(input_file, output_file):
    """
    医療データ処理パイプラインを実行する
    
    Args:
        input_file: 入力CSVファイルのパス
        output_file: 出力CSVファイルのパス
    """
    # 1. データの読み込み
    print("データを読み込んでいます...")
    data = load_patient_data(input_file)
    print(f"読み込み完了: {len(data)}行")
    
    # 2. 欠損値の処理
    print("欠損値を処理しています...")
    data = handle_missing_values(data, method='mean')
    print(f"処理後: {len(data)}行")
    
    # 3. 異常値の処理（年齢と血糖値）
    if 'age' in data.columns:
        print("異常値（年齢）を処理しています...")
        data = handle_outliers(data, column='age', method='clip')
    
    if 'glucose' in data.columns:
        print("異常値（血糖値）を処理しています...")
        data = handle_outliers(data, column='glucose', method='clip')
    
    # 4. フィルタリング（年齢50歳以上）
    if 'age' in data.columns:
        print("年齢50歳以上でフィルタリングしています...")
        data = data[data['age'] >= 50]
        print(f"フィルタリング後: {len(data)}行")
    
    # 5. 基本統計量の計算
    print("基本統計量を計算しています...")
    numeric_columns = data.select_dtypes(include=[np.number]).columns.tolist()
    if numeric_columns:
        stats = calculate_statistics(data, numeric_columns)
        print("\n基本統計量:")
        print(stats)
    
    # 6. 結果を保存
    print(f"結果を保存しています: {output_file}")
    data.to_csv(output_file, index=False, encoding='utf-8-sig')
    print("処理完了！")

# 使用例
# process_medical_data('input.csv', 'output.csv')
```

## 6. まとめ

本レッスンでは、医療データ処理でのGitHub Copilot活用について学びました。CSVファイルの読み込み、データフィルタリング、統計計算、データ前処理、データ処理パイプラインの構築などの実践例を通じて、効率的なコード生成方法を理解しました。

GitHub Copilotのコメント機能を適切に活用することで、医療データ処理のコードを効率的に生成できます。特に、具体的で明確なコメントを書くことで、より適切なコードが生成されます。

次のレッスンでは、機械学習コードの生成について詳しく学びます。scikit-learnを使用した機械学習モデルのコード生成方法を理解していきましょう。

---

### 参考資料

- [GitHub Copilot Documentation](https://docs.github.com/en/copilot): GitHub Copilotの公式ドキュメント
- [Pandas Documentation](https://pandas.pydata.org/docs/): pandasの公式ドキュメント
- [NumPy Documentation](https://numpy.org/doc/): NumPyの公式ドキュメント
